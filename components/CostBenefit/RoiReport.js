'use client';
import { useState, useMemo, useRef } from "react";
import { usePDF } from 'react-to-pdf';
import "@/app/styles/roi-report.css";
import Image from "next/image";
import Link from "next/link";
import generateRoiReportHTML from "./generateRoiReportHTML";

// Reusable components
const InputField = ({ label, value, onChange }) => (
    <div className="report-row">
        <label className="report-label">{label}</label>
        <div className="input-wrapper">
            <input value={value} readOnly disabled onChange={onChange} className="border-none outline-none bg-transparent" step="any" />
        </div>
    </div>
);

const CalculationRow = ({ label, value }) => (
    <div className="report-row">
        <span className="report-label">{label}</span>
        <span className="report-value">{value}</span>
    </div>
);

const ImpactRow = ({ label, value, isCost = false }) => {
    const getCostColor = (valStr) => {
        if (!isCost) return "transparent";
        const numericValue = parseFloat(String(valStr).replace(/[^0-9.-]+/g, ""));
        if (numericValue <= 0) return "rgb(0, 128, 0)";  // green
        if (numericValue > 0 && numericValue < 20000) return "rgb(255, 165, 0)";  // orange
        return "rgb(255, 0, 0)";  // red
    };
    return (
        <div className="report-row impact">
            <span className="report-label">{label}</span>
            <span
                className="report-value"
                style={{
                    backgroundColor: getCostColor(value),
                    color: isCost ? "white" : "inherit",
                }}
            >
                {value}
            </span>
        </div>
    );
};

function RoiReport({ contentData, totalRunningHours }) {
    const { toPDF, targetRef } = usePDF({
        filename: 'roi-report.pdf',
        page: { margin: 20 }
    });

    const [currentRunningHours, setCurrentRunningHours] = useState(totalRunningHours || contentData?.clientMachineSparePart?.totalRunningHours?.value);
    const [fiberCost, setFiberCost] = useState(contentData?.clientMachineSparePart?.fiberCost?.value);
    const [rotorLifetime, setRotorLifetime] = useState(contentData?.clientMachineSparePart?.lifetimeOfRotor?.value);
    const [lineCapacity, setLineCapacity] = useState(contentData?.clientMachineSparePart?.capacityOfLine?.value);
    const [dailyRunningHours, setDailyRunningHours] = useState(contentData?.clientMachineSparePart?.dailyRunningHours?.value);
    const [lossRangeA, setLossRangeA] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[0]?.value);
    const [lossRangeB, setLossRangeB] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[1]?.value);
    const [lossRangeC, setLossRangeC] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[2]?.value);
    const [lossRangeD, setLossRangeD] = useState(contentData?.clientMachineSparePart?.fiberLossRanges?.[3]?.value);
    const [installedMotorPower, setInstalledMotorPower] = useState(contentData?.clientMachineSparePart?.installedMotorPower?.value);
    const [consumptionGoodRotor, setConsumptionGoodRotor] = useState(contentData?.clientMachineSparePart?.actualMotorPowerConsumption?.healthy?.value);
    const [consumptionWornRotor, setConsumptionWornRotor] = useState(contentData?.clientMachineSparePart?.actualMotorPowerConsumption?.wornout?.value);
    const [powerCost, setPowerCost] = useState(contentData?.clientMachineSparePart?.powerCost?.value);

    const calculationData = useMemo(() => {
        const I =
            currentRunningHours > rotorLifetime
                ? currentRunningHours - rotorLifetime
                : 0;

        // Power Loss Calculation
        let totalPowerLossCost = 0;
        const powerConsumptionGood =
            (installedMotorPower * consumptionGoodRotor) / 100;
        const powerConsumptionWorn =
            (installedMotorPower * consumptionWornRotor) / 100;
        const increaseInConsumption = powerConsumptionWorn - powerConsumptionGood;
        let totalPowerConsumptionWorn = 0;
        if (I > 0) {
            totalPowerConsumptionWorn = increaseInConsumption * I;
            totalPowerLossCost = totalPowerConsumptionWorn * powerCost;
        }

        // Fiber Loss Calculation
        const totalProductionPerHour = lineCapacity / 24;
        let fiberLossInTons = 0;
        if (I > 0) {
            const pA = lossRangeA / 100;
            const pB = lossRangeB / 100;
            const pC = lossRangeC / 100;
            const pD = lossRangeD / 100;
            const hoursInTierA = Math.max(0, Math.min(I, 240));
            const hoursInTierB = Math.max(0, Math.min(I, 480) - 240);
            const hoursInTierC = Math.max(0, Math.min(I, 720) - 480);
            const hoursInTierD = Math.max(0, I - 720);
            fiberLossInTons =
                totalProductionPerHour *
                (hoursInTierA * pA +
                    hoursInTierB * pB +
                    hoursInTierC * pC +
                    hoursInTierD * pD);
        }
        const totalFiberLossCost = fiberLossInTons * fiberCost;
        const totalLoss = totalFiberLossCost + totalPowerLossCost;

        return {
            totalProduction: lineCapacity,
            fiberLossInTons,
            noOfHoursWornOut: I,
            powerConsumptionGood,
            powerConsumptionWorn,
            increaseInConsumption,
            totalPowerConsumptionWorn,
            totalFiberLossCost,
            totalPowerLossCost,
            totalLoss,
        };
    }, [
        currentRunningHours,
        rotorLifetime,
        fiberCost,
        lineCapacity,
        lossRangeA,
        lossRangeB,
        lossRangeC,
        lossRangeD,
        installedMotorPower,
        consumptionGoodRotor,
        consumptionWornRotor,
        powerCost,
    ]);

    const handleGeneratePdf = async () => {
        const parameters = {
            lineCapacity,
            dailyRunningHours,
            fiberCost,
            rotorLifetime,
            currentRunningHours,
            lossRangeA,
            lossRangeB,
            lossRangeC,
            lossRangeD,
            installedMotorPower,
            consumptionGoodRotor,
            consumptionWornRotor,
            powerCost
        }

        const calculatiedData = {
            totalProduction: lineCapacity,
            fiberLossInTons: calculationData.fiberLossInTons,
            noOfHoursWornOut: calculationData.noOfHoursWornOut,
            powerConsumptionGood: calculationData.powerConsumptionGood,
            powerConsumptionWorn: calculationData.powerConsumptionWorn,
            increaseInConsumption: calculationData.increaseInConsumption,
            totalPowerConsumptionWorn: calculationData.totalPowerConsumptionWorn,
            totalFiberLossCost: calculationData.totalFiberLossCost,
            totalPowerLossCost: calculationData.totalPowerLossCost,
            totalLoss: calculationData.totalLoss
        };

        const html = generateRoiReportHTML(parameters, calculationData);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();

        // Wait for content to load
        iframe.onload = () => {
            iframe.contentWindow.print();
            // Clean up after printing
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        };
    };

    return (
        <>
            <div className="report-container" ref={targetRef}>
                <div className="">
                    <Link href="/dashboard">
                        <Image src="/logo.png" alt="" width={300} height={100} className="h-5 w-auto mx-auto mb-6" />
                    </Link>
                    <h1 className="report-title">ROI Report</h1>
                </div>
                <div className="report-main-grid">
                    <div className="report-section">
                        <h2 className="report-section-title">FIBER LOSS CALCULATION</h2>
                        <div className="report-subsection">
                            <h3>Performance Parameters</h3>
                            <InputField
                                label="Capacity of Line (TPD)"
                                value={lineCapacity}
                                onChange={(e) => setLineCapacity(e.target.value)}
                            />
                            <InputField
                                label="Daily Running Hours (hrs)"
                                value={dailyRunningHours}
                                onChange={(e) => setDailyRunningHours(e.target.value)}
                            />
                            <InputField
                                label="Fiber Cost (euro/ton)"
                                value={fiberCost}
                                onChange={(e) => setFiberCost(e.target.value)}
                            />
                            <InputField
                                label="Lifetime of Rotor (hours)"
                                value={rotorLifetime}
                                onChange={(e) => setRotorLifetime(e.target.value)}
                            />
                            <InputField
                                label="Total Running Hours Of Rotor (hours)"
                                value={currentRunningHours}
                                onChange={(e) => setCurrentRunningHours(e.target.value)}
                            />
                            <InputField
                                label="Fiber Loss (24-240 hrs) %"
                                value={lossRangeA}
                                onChange={(e) => setLossRangeA(e.target.value)}
                            />
                            <InputField
                                label="Fiber Loss (240-480 hrs) %"
                                value={lossRangeB}
                                onChange={(e) => setLossRangeB(e.target.value)}
                            />
                            <InputField
                                label="Fiber Loss (480-720 hrs) %"
                                value={lossRangeC}
                                onChange={(e) => setLossRangeC(e.target.value)}
                            />
                            <InputField
                                label="Fiber Loss (>720 hrs) %"
                                value={lossRangeD}
                                onChange={(e) => setLossRangeD(e.target.value)}
                            />
                        </div>
                        <div className="report-subsection">
                            <h3>Calculations</h3>
                            <CalculationRow
                                label="Total Production (Tons/day)"
                                value={calculationData.totalProduction.toLocaleString()}
                            />
                            <CalculationRow
                                label="Fiber Loss (Tons)"
                                value={calculationData.fiberLossInTons.toFixed(2)}
                            />
                            <CalculationRow
                                label="No of Hours (Worn-out Rotor)"
                                value={calculationData.noOfHoursWornOut.toLocaleString()}
                            />
                            <CalculationRow
                                label="Total Fiber Loss"
                                value={`€ ${calculationData.totalFiberLossCost.toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                                )}`}
                            />
                        </div>
                    </div>

                    <div className="report-section">
                        <h2 className="report-section-title">POWER LOSS CALCULATION</h2>
                        <div className="report-subsection">
                            <h3>Performance Parameters</h3>
                            <InputField
                                label="Capacity of Line (tpd)"
                                value={lineCapacity}
                                onChange={(e) => setLineCapacity(e.target.value)}
                            />
                            <InputField
                                label="Daily Running Hours (hrs)"
                                value={dailyRunningHours}
                                onChange={(e) => setDailyRunningHours(e.target.value)}
                            />
                            <InputField
                                label="Installed Motor Power (kw)"
                                value={installedMotorPower}
                                onChange={(e) => setInstalledMotorPower(e.target.value)}
                            />
                            <InputField
                                label="Consumption (Healthy Rotor) %"
                                value={consumptionGoodRotor}
                                onChange={(e) => setConsumptionGoodRotor(e.target.value)}
                            />
                            <InputField
                                label="Consumption (Worn-out Rotor) %"
                                value={consumptionWornRotor}
                                onChange={(e) => setConsumptionWornRotor(e.target.value)}
                            />
                            <InputField
                                label="Lifetime of Rotor (hours)"
                                value={rotorLifetime}
                                onChange={(e) => setRotorLifetime(e.target.value)}
                            />
                            <InputField
                                label="Total Running Hours of Rotor (hours)"
                                value={currentRunningHours}
                                onChange={(e) => setCurrentRunningHours(e.target.value)}
                            />
                            <InputField
                                label="Power Cost (euro/kwhr)"
                                value={powerCost}
                                onChange={(e) => setPowerCost(e.target.value)}
                            />
                        </div>
                        <div className="report-subsection">
                            <h3>Calculations</h3>
                            <CalculationRow
                                label="Total Production (Tons/day)"
                                value={calculationData.totalProduction.toLocaleString()}
                            />
                            <CalculationRow
                                label="Power Consumption - Healthy Rotor (kwhr)"
                                value={calculationData.powerConsumptionGood.toFixed(0)}
                            />
                            <CalculationRow
                                label="Power Consumption - Worn-out Rotor (kwhr)"
                                value={calculationData.powerConsumptionWorn.toFixed(0)}
                            />
                            <CalculationRow
                                label="Power Consumption - Increased (kwhr)"
                                value={calculationData.increaseInConsumption.toFixed(0)}
                            />
                            <CalculationRow
                                label="No of Hours (Worn-out Rotor)"
                                value={calculationData.noOfHoursWornOut.toLocaleString()}
                            />
                            <CalculationRow
                                label="Total Power Consumption (Worn-out) (kw)"
                                value={calculationData.totalPowerConsumptionWorn.toLocaleString()}
                            />
                            <CalculationRow
                                label="Total Power Cost (Worn-out)"
                                value={`€ ${calculationData.totalPowerLossCost.toLocaleString(
                                    undefined,
                                    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                                )}`}
                            />
                        </div>
                    </div>
                </div>

                <div className="report-section overall-impact">
                    <h2 className="report-section-title">OVERALL IMPACT</h2>
                    {/* --- UPDATED: The h3 is now a single, centered header --- */}
                    <div className="impact-header">
                        <h3>Performance Parameters</h3>
                    </div>
                    <div className="impact-grid">
                        <div className="impact-column">
                            <ImpactRow
                                label="Total Fiber Loss"
                                value={`€ ${Math.round(
                                    calculationData.totalFiberLossCost
                                ).toLocaleString()}`}
                                isCost={true}
                            />
                            <ImpactRow
                                label="Total Power Cost (Worn-out)"
                                value={`€ ${Math.round(
                                    calculationData.totalPowerLossCost
                                ).toLocaleString()}`}
                                isCost={true}
                            />
                        </div>
                        <div className="impact-column">
                            <ImpactRow
                                label="Total Loss (Cost)"
                                value={`€ ${Math.round(
                                    calculationData.totalLoss
                                ).toLocaleString()}`}
                                isCost={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="download-section">
                <button className="pdf-button" onClick={handleGeneratePdf}>
                    Download Report as PDF
                </button>
            </div>
        </>
    );
}

export default RoiReport;

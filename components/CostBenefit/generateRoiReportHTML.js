let logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAAVCAYAAACDi5Z8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7VrZURtBEG0JQVEFH+s/bkQEyBGwRICIABEBIgKkCCwiMERgiMBLBBYRMOYoPi1/c8ivVbuuodV7H+Vy6VUNoN6Z2ZmeN32JGpWIzc3NMeXEw8NDjWaoHHWaYQYFDSoRtVrN0AwzzPD/oLaxsbFnC97e3szz8/NP2dEBlpeXd6U8rH8U5DsZj4+PN5QB6+vru7BMTlSf8Xg8enp6uqWCsLq6uj03N9cs6h1SH2FzaWcQp39N1wJqDNeAUj1bgA338Ktvy1ZWVpqNRsND320x3iwuLrqUAltbW0fY+IWUI1BtI9C8ppTAmgZobkwfnp//5D1c3N/fX1IOQEc3Uhe+29yhlGgCOFxPzDUC+VrywMGLXdm3Xq938Ct0P/J8kyI2+AwjBQ73FnL37u4ulbV4f3/vhDzqUvlwmZQgyR1bGsoAnOOeckEmjxLczqRwQL4rKXx5eflNFSGSGBGk8LKQgueLuN1ugYqNQxM3zctCDhxOJ+wZ9tajgoC5WljfF1s2Pz8/oooQSgxWmkYK3PhLxAP7xpjUi8QtOIt6XqBij/Gu/aBh3i7ILEnsgBwDSgEmtm+6w1AoufGubt75uA5kN+jDlX2gn77spxLDv9nXiqXoIyjqUAZoSsV8PdHN5QCLcgKE/g7iekFDTHHOFk4hR6qDlMRmq8PWU3Q7pALBMVEROkkLjRiHMFk/FD86gKXoUUbgYA6EyGC+PkfgthBRdymxBghisKcT5VHig8T4ffuzH0RfiT5HBR9kc2lp6YwqxhQxsDH2u9rG2jk3fCo+e/wDrmkg3n9S1g3hbEKRJYozOJuSlwVjOda6FOR28pJbWrYiXEpapCmJZ2auplRsfpJiLSwseKI7K/aISkCWuCgACPwhhWc3wsG3P+fQfhZimdLgq3RR7FIQ+FbmUqKIMZJmnpnLh0wpoaSo7Ea8yR/G3ChKaNM/BC1FtWsxXEsRQ5y8NxzuvCv036RqUvoJwohhYCJbWNjUQiAbcOWPEgLZTUtJUYc7OzvbQcOcQ/G8lNSV1yJlIK2JG/f6+ir1MEKh6e8eoCsjL1HeDAvWiCufPVuGi1mKJdWgEcMENQpkIOw/ZaHFwfMLSg7NrLahbBM0tkRKn0Kjewb2ornCq6gxfoYmLRinukNrD0OlLO+muUAaYFXPlaynEkwRAwu5tgtXIMFxSJoX60cT5P2hKDK6Z+uztrb2DcGiPGATV4aPq73EjD2lnPD1X1lhK4BmMX7ZHzi4wuKmTBj71bjKIRSTJwjLHN3jBntc9vbbmL8vUEjBiJw/xFokRhHk9tPsDlWMRFkJB4gyrZwMrtevojaODU25A5CsKSpxn9D4y6e2Mj4rsZpW0zDigDjOWiBj2lNcxAWvV2s07ZYKybB4nYpLLxWJ01VEyX3FpYSmsFqKGqR4towtEt8Kf/OemMbBjT+gAuF/z9Pi+Cmur0xR/fGXJgQgh3Z5OlQAqnYp/B9cx7aAq55aRz5ApG0uonHXlmPjWneWG/Q9FjJ1buvdXbiBz7YMyo5UBhTWw3uSfN094oJU0loG9upg3p6UB2m2BrasIPKHPeMwJ/9HMQJChrE89gx43ciAXKkfpQ4Uh1v5Puhl6n1/ABH2ar0XxGSPAAAAAElFTkSuQmCC";

function generateRoiReportHTML(parameters, calculationData) {
    const {
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
    } = parameters;

    const {
        totalProduction,
        fiberLossInTons,
        noOfHoursWornOut,
        powerConsumptionGood,
        powerConsumptionWorn,
        increaseInConsumption,
        totalPowerConsumptionWorn,
        totalFiberLossCost,
        totalPowerLossCost,
        totalLoss
    } = calculationData;

    // Function to determine color class for impact values
    function getCostClass(value) {
        const numericValue = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
        if (numericValue <= 0) return "cost-green";
        if (numericValue > 0 && numericValue < 20000) return "cost-orange";
        return "cost-red";
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ROI Report</title>
    <style type="text/css" media="print">
    @page {
        size: auto;
        margin-inline: 24px;
        margin-top: 0;
        margin-bottom: 0;
    }
    </style>
    <style>
        /* 1. FONT IMPORT */
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: "Inter", sans-serif;
            background-color: #f7f8fc;
            color: #1a202c;
            line-height: 1.6;
            padding: 2rem;
        }

        /* 4. REPORT CONTAINER & LAYOUT */
        .report-container {
            background: #ffffff;
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
        }

        .report-title {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            color: #1a202c;
            margin-bottom: 1.5rem;
        }

        .report-main-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2.5rem;
        }

        .report-section {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            background-color: #ffffff;
        }

        .report-section-title {
            background-color: #4a5568 !important;
            color: #ffffff !important;
            font-size: 1rem;
            font-weight: 600;
            padding: 0.75rem;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .report-subsection {
            padding: 1rem 1.5rem;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0.8rem 1rem;
            align-items: center;
        }

        .report-subsection h3 {
            grid-column: 1 / -1;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #718096;
            margin: 0 0 1rem 0;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 0.5rem;
        }

        /* 5. STYLES FOR INPUT & CALCULATION ROWS */
        .report-row {
            grid-column: 1 / -1;
            display: contents;
        }

        .report-label {
            color: #1a202c;
            font-weight: 500;
            text-align: left;
            white-space: nowrap;
            padding-right: 1rem;
        }

        .report-value {
            color: #1a202c;
            font-weight: 600;
            text-align: right;
        }

        .input-wrapper {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }

        .input-wrapper input {
            font-family: "Inter", sans-serif;
            font-size: 1rem;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            background-color: #f8fafc;
            width: 120px;
            text-align: right;
        }

        .input-wrapper input:focus {
            outline: none;
            border-color: #4a5568;
            box-shadow: 0 0 0 2px rgba(74, 85, 104, 0.2);
        }

        /* 6. --- FINAL OVERALL IMPACT SECTION STYLES --- */
        .overall-impact {
            grid-column: 1 / -1;
            margin-top: 2rem;
            padding: 1rem 1.5rem;
        }

        .impact-header {
            text-align: center;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 1rem;
        }

        .impact-header h3 {
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #718096;
            margin: 0;
            padding-bottom: 0.5rem;
            display: inline-block;
        }

        .impact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .impact-grid .report-subsection {
            padding: 0;
            display: block;
        }

        .report-row.impact {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.8rem 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .report-row.impact:last-child {
            border-bottom: none;
        }

        .report-row.impact .report-value {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            color: white;
            min-width: 160px;
            text-align: center;
            font-weight: 700;
        }

        /* Cost color classes */
        .cost-green {
            background-color: #2e937a !important;
        }

        .cost-orange {
            background-color: #f6b352 !important;
        }

        .cost-red {
            background-color: #d65a49 !important;
        }

        /* 7. PDF DOWNLOAD BUTTON STYLES */
        .download-section {
            display: flex;
            justify-content: center;
            padding: 2.5rem 0 1rem 0;
        }

        .pdf-button {
            font-family: "Inter", sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #ffffff;
            background-color: #4a5568;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            cursor: pointer;
        }

       .logo-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 30px auto 20px auto;
        }

        @media print {
            body {
                background-color: white;
                padding: 0;
            }
            .download-section {
                display: none;
            }
            .report-container {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06) !important;
                border: none;
                padding: 0;
            }
            .report-title {
                margin-top: 0;
                padding-top: 1rem;
            }
            /* Ensure colors are preserved in print */
            .cost-green, .cost-orange, .cost-red {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            /* Ensure borders are preserved in print */
            .report-section {
                border: 1px solid #e2e8f0 !important;
            }
            .report-section-title {
                background-color: #4a5568 !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            /* Ensure box shadows are preserved in print */
            .report-container {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    </style>
</head>
<body>
    <div class="logo-wrapper">
        <img src="${logo}" alt="Logo"/>
    </div>
    <div class="report-container">
        <h1 class="report-title">ROI Report</h1>
        
        <div class="report-main-grid">
            <div class="report-section">
                <h2 class="report-section-title">FIBER LOSS CALCULATION</h2>
                
                <div class="report-subsection">
                    <h3>Performance Parameters</h3>
                    
                    <div class="report-row">
                        <span class="report-label">Capacity of Line (TPD)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lineCapacity}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Daily Running Hours (hrs)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${dailyRunningHours}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Cost (euro/ton)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${fiberCost}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Lifetime of Rotor (hours)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${rotorLifetime}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Total Running Hours Of Rotor (hours)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${currentRunningHours}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Loss (24-240 hrs) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lossRangeA}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Loss (240-480 hrs) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lossRangeB}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Loss (480-720 hrs) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lossRangeC}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Loss (>720 hrs) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lossRangeD}</span>
                        </div>
                    </div>
                </div>
                
                <div class="report-subsection">
                    <h3>Calculations</h3>
                    
                    <div class="report-row">
                        <span class="report-label">Total Production (Tons/day)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${totalProduction.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Fiber Loss (Tons)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${fiberLossInTons.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">No of Hours (Worn-out Rotor)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${noOfHoursWornOut.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Total Fiber Loss</span>
                        <div class="input-wrapper">
                            <span class="report-value">€ ${totalFiberLossCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="report-section">
                <h2 class="report-section-title">POWER LOSS CALCULATION</h2>
                
                <div class="report-subsection">
                    <h3>Performance Parameters</h3>
                    
                    <div class="report-row">
                        <span class="report-label">Capacity of Line (tpd)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${lineCapacity}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Daily Running Hours (hrs)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${dailyRunningHours}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Installed Motor Power (kw)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${installedMotorPower}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Consumption (Healthy Rotor) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${consumptionGoodRotor}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Consumption (Worn-out Rotor) %</span>
                        <div class="input-wrapper">
                            <span class="report-value">${consumptionWornRotor}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Lifetime of Rotor (hours)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${rotorLifetime}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Total Running Hours of Rotor (hours)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${currentRunningHours}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Power Cost (euro/kwhr)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${powerCost}</span>
                        </div>
                    </div>
                </div>
                
                <div class="report-subsection">
                    <h3>Calculations</h3>
                    
                    <div class="report-row">
                        <span class="report-label">Total Production (Tons/day)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${totalProduction.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Power Consumption - Healthy Rotor (kwhr)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${powerConsumptionGood.toFixed(0)}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Power Consumption - Worn-out Rotor (kwhr)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${powerConsumptionWorn.toFixed(0)}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Power Consumption - Increased (kwhr)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${increaseInConsumption.toFixed(0)}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">No of Hours (Worn-out Rotor)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${noOfHoursWornOut.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Total Power Consumption (Worn-out) (kw)</span>
                        <div class="input-wrapper">
                            <span class="report-value">${totalPowerConsumptionWorn.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div class="report-row">
                        <span class="report-label">Total Power Cost (Worn-out)</span>
                        <div class="input-wrapper">
                            <span class="report-value">€ ${totalPowerLossCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="report-section overall-impact">
                <h2 class="report-section-title">OVERALL IMPACT</h2>
                
                <div class="impact-header">
                    <h3>Performance Parameters</h3>
                </div>
                
                <div class="impact-grid">
                    <div class="impact-column">
                        <div class="report-subsection">
                            <div class="report-row impact">
                                <span class="report-label">Total Fiber Loss</span>
                                <span class="report-value ${getCostClass(Math.round(totalFiberLossCost))}">€ ${Math.round(totalFiberLossCost).toLocaleString()}</span>
                            </div>
                            
                            <div class="report-row impact">
                                <span class="report-label">Total Power Cost (Worn-out)</span>
                                <span class="report-value ${getCostClass(Math.round(totalPowerLossCost))}">€ ${Math.round(totalPowerLossCost).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="impact-column">
                        <div class="report-subsection">
                            <div class="report-row impact">
                                <span class="report-label">Total Loss (Cost)</span>
                                <span class="report-value ${getCostClass(Math.round(totalLoss))}">€ ${Math.round(totalLoss).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="download-section">
            <button class="pdf-button" onclick="window.print()">Download PDF Report</button>
        </div>
    </div>
</body>
</html>
    `;

    return html;
}

export default generateRoiReportHTML;
export const calculateFiberLoss = (
    data = {
        capacityOfLine: 0,
        dailyRunningHours: 0,
        fiberCost: 0,
        fiberLossRanges: [],
        lifetimeOfRotor: 0,
        totalRunningHours: 0,
    }
) => {

    const A = data.capacityOfLine;
    const B = data.dailyRunningHours;
    const C = data.fiberCost;
    const fiberLossRanges = data.fiberLossRanges;
    const E = data.lifetimeOfRotor;
    const F = data.totalRunningHours;
    const G = (A / 24) * B;
    const I = F - E;

    const range = fiberLossRanges.find((r) => {
        if (r.max === null) {
            return I > r.min;
        } else {
            return I > r.min && I <= r.max;
        }
    });

    if (!range) {
        console.error(`Value ${I} is outside the valid range`);
        return {
            fiberLoss: 0,
            fiberLossCost: 0,
        };
    }

    const getCoefficient = (rangeIndex) => {
        return fiberLossRanges[rangeIndex]
            ? fiberLossRanges[rangeIndex].value / 100
            : 0;
    };

    const coeff1 = getCoefficient(0);
    const coeff2 = getCoefficient(1);
    const coeff3 = getCoefficient(2);
    const coeff4 = getCoefficient(3);

    let piecewiseResult;
    if (I > 24 && I <= 240) {
        piecewiseResult = coeff1 * I;
    } else if (I > 240 && I <= 480) {
        piecewiseResult = coeff1 * 240 + coeff2 * (I - 240);
    } else if (I > 480 && I <= 720) {
        piecewiseResult = coeff1 * 240 + coeff2 * 240 + coeff3 * (I - 480);
    } else if (I > 720) {
        piecewiseResult =
            coeff1 * 240 + coeff2 * 240 + coeff3 * 240 + coeff4 * (I - 720);
    }
    let H = Math.round((A / 24) * piecewiseResult * 100) / 100; // Better rounding
    const J = H * C;

    return {
        fiberLoss: H,
        fiberLossCost: J,
    };
};

export const calculatePowerLoss = (
    data = {
        capacityOfLine: 0,
        dailyRunningHours: 0,
        installedMotorPower: 0,
        actualMotorPowerConsumption: {
            healthy: { value: 0, unit: "%" },
            wornout: { value: 0, unit: "%" },
        },
        powerConsumption: {
            healthy: { value: 0, unit: "kWhr" },
            wornout: { value: 0, unit: "kWhr" },
        },
        lifetimeOfRotor: 0,
        totalRunningHours: 0,
        powerCost: 0,
    }
) => {
    const A = data.capacityOfLine;
    const B = data.dailyRunningHours;
    const C = data.installedMotorPower;
    const D = data.actualMotorPowerConsumption.healthy.value;
    const E = data.actualMotorPowerConsumption.wornout.value;
    const F = data.lifetimeOfRotor;
    const G = data.totalRunningHours;
    const H = data.powerCost;

    const I = (A / 24) * B;
    const J = C * D;
    const K = C * E;
    const L = K - J;
    const M = G - F < 0 ? 0 : G - F;
    const N = (L * M) / 100;
    const O = N * H;

    return {
        powerCost: Math.round(O),
        totalPowerLoss: Math.round(N),
    };
};
import { Bar } from "react-chartjs-2";
import { useCurrency } from "@/context/CurrencyContext";
import { convertAndFormatWithContext } from "@/lib/currencyChange";

// Chart Component
const CostChart = ({ barData, chartRef }) => {

    const { selectedCurrency, currencyValue } = useCurrency();

    const data = {
        labels: ['Power Loss', 'Fiber Loss', 'Total Loss'],
        datasets: [
            {
                label: '',
                data: barData,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!ctx || !chartArea) {
                        return null;
                    }

                    const { element } = context;
                    let gradientFill;

                    if (element && element.base && element.height) {
                        gradientFill = ctx.createLinearGradient(0, element.base, 0, element.base - element.height);
                    } else {
                        gradientFill = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    }

                    switch (context.dataIndex) {
                        case 0:
                            gradientFill.addColorStop(0, '#2D3E5C');
                            gradientFill.addColorStop(1, '#415E91');
                            break;
                        case 1:
                            gradientFill.addColorStop(0, '#FF9A00');
                            gradientFill.addColorStop(1, '#FFB647');
                            break;
                        case 2:
                            gradientFill.addColorStop(0, '#BF1E21');
                            gradientFill.addColorStop(1, '#EB5154');
                            break;
                        default:
                            gradientFill.addColorStop(0, 'rgba(211, 211, 211, 0.8)');
                            gradientFill.addColorStop(1, 'rgba(128, 128, 128, 0.8)');
                    }
                    return gradientFill;
                },
                borderColor: [
                    'rgba(45, 62, 92, 1)',
                    'rgba(255, 154, 0, 1)',
                    'rgba(191, 30, 33, 1)',
                ],
                borderWidth: 1,
                borderRadius: 5
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                offset: 0,
                formatter: (value, context) => {
                    // if (context.dataIndex === 2) {
                    //     return '';
                    // }
                    return convertAndFormatWithContext(value, { selectedCurrency, currencyValue });
                },
                font: {
                    weight: 'bold',
                    size: 16,
                },
                color: '#333',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                },
                ticks: {
                    display: false
                },
                border: {
                    color: '#96A5BA',
                    width: 2
                },
                title: {
                    display: true,
                    text: 'Cost',
                    color: '#96A5BA',
                    rotate: '180',
                    font: {
                        size: 16,
                        weight: 'bold',
                    }
                },
            },
            x: {
                grid: {
                    display: false
                },
                border: {
                    color: '#96A5BA',
                    width: 2
                },
                ticks: {
                    display: true,
                    color: '#333',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    padding: 10,
                    callback: function (value, index) {
                        const labels = ['Power Loss', 'Fiber Loss', 'Total Loss'];
                        return labels[index];
                    }
                }
            }
        },
    };

    // Check if all data values are 0
    const allZero = Array.isArray(barData) && barData.every(val => val === 0);

    return (
        <div className="w-[calc(100%_-_400px)] h-[calc(50svh_-_130px)] absolute bottom-[150px]">
            <Bar
                ref={chartRef}
                data={data}
                options={{
                    ...options,
                    layout: {
                        padding: {
                            top: 30,
                            bottom: 30
                        }
                    },
                    plugins: {
                        ...options.plugins,
                        datalabels: {
                            ...options.plugins.datalabels,
                            font: {
                                weight: 'bold',
                            }
                        }
                    },
                    scales: {
                        ...options.scales,
                        x: {
                            ...options.scales.x,
                            ticks: {
                                ...options.scales.x.ticks,
                                color: (context) => {
                                    if(allZero) return 'rgba(51,51,51,0)' 
                                    // Set opacity to 0.5 (50%) for tick labels
                                    return 'rgba(255,255,255,1)';
                                },
                                mirror: true,
                                labelOffset: 0.5,
                                z: 1,
                            }
                        }
                    }
                }}
                id='chart'
            />
        </div>
    );
};

export default CostChart;
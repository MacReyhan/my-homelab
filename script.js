// --- RustDesk Tab Switching ---
const switchTab = (tabName) => {
    const tailscaleBtn = document.getElementById('tab-tailscale');
    const publicBtn = document.getElementById('tab-public');
    const tailscaleContent = document.getElementById('content-tailscale');
    const publicContent = document.getElementById('content-public');
    const isDark = document.body.classList.contains('dark');

    if (tabName === 'tailscale') {
        if (isDark) {
            tailscaleBtn.classList.add('bg-gray-800', 'text-stone-100', 'shadow-sm');
            tailscaleBtn.classList.remove('text-stone-500');
            publicBtn.classList.remove('bg-gray-800', 'text-stone-100', 'shadow-sm');
            publicBtn.classList.add('text-stone-500');
        } else {
            tailscaleBtn.classList.add('bg-white', 'text-stone-800', 'shadow-sm');
            tailscaleBtn.classList.remove('text-stone-500');
            publicBtn.classList.remove('bg-white', 'text-stone-800', 'shadow-sm');
            publicBtn.classList.add('text-stone-500');
        }
        tailscaleContent.classList.remove('hidden');
        publicContent.classList.add('hidden');
    } else {
        if (isDark) {
            publicBtn.classList.add('bg-gray-800', 'text-stone-100', 'shadow-sm');
            publicBtn.classList.remove('text-stone-500');
            tailscaleBtn.classList.remove('bg-gray-800', 'text-stone-100', 'shadow-sm');
            tailscaleBtn.classList.add('text-stone-500');
        } else {
            publicBtn.classList.add('bg-white', 'text-stone-800', 'shadow-sm');
            publicBtn.classList.remove('text-stone-500');
            tailscaleBtn.classList.remove('bg-white', 'text-stone-800', 'shadow-sm');
            tailscaleBtn.classList.add('text-stone-500');
        }
        publicContent.classList.remove('hidden');
        tailscaleContent.classList.add('hidden');
    }
};

// --- Clipboard Helper with Animation ---
const copyToClipboard = (text, btnElement) => {
    navigator.clipboard.writeText(text).then(() => {
        // Pulse the button
        if(btnElement) {
            btnElement.classList.add('copy-success-pulse');
            setTimeout(() => btnElement.classList.remove('copy-success-pulse'), 500);
        }
        
        showToast();
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback to old method if needed
        const dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        
        if(btnElement) {
            btnElement.classList.add('copy-success-pulse');
            setTimeout(() => btnElement.classList.remove('copy-success-pulse'), 500);
        }
        
        showToast();
    });
};

const showToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 2500);
};

// --- Theme Toggle ---
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const btn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark')) {
        btn.textContent = '☀️ Light';
    } else {
        btn.textContent = '🌙 Dark';
    }
    // Update chart colors
    updateChart();
    // Refresh tab styling to match new theme
    const activeTab = document.getElementById('tab-tailscale').classList.contains('bg-white') || 
                     document.getElementById('tab-tailscale').classList.contains('bg-gray-800') ? 'tailscale' : 'public';
    switchTab(activeTab);
});

// --- Radar Chart ---
let chart;
function updateChart() {
    if (chart) {
        chart.destroy();
    }
    const ctx = document.getElementById('nodeRadarChart').getContext('2d');
    
    const isDark = document.body.classList.contains('dark');
    const gridColor = isDark ? '#4B5563' : '#E7E5E4';
    const labelColor = isDark ? '#D1D5DB' : '#78716C';
    
    chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Compute', 'Graphics', 'Storage', 'Network', 'Uptime'],
            datasets: [
                {
                    label: 'Win11 (Rig)',
                    data: [90, 95, 80, 70, 60],
                    backgroundColor: 'rgba(234, 88, 12, 0.2)',
                    borderColor: 'rgb(234, 88, 12)',
                    pointBackgroundColor: 'rgb(234, 88, 12)',
                    borderWidth: 2
                },
                {
                    label: 'VMLinux (VM)',
                    data: [60, 20, 70, 80, 70],
                    backgroundColor: 'rgba(87, 83, 78, 0.2)',
                    borderColor: 'rgb(87, 83, 78)',
                    pointBackgroundColor: 'rgb(87, 83, 78)',
                    borderWidth: 2
                },
                {
                    label: 'GCS (Cloud)',
                    data: [40, 0, 50, 100, 95],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    pointBackgroundColor: 'rgb(59, 130, 246)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: {
                        font: { size: 10, family: "'Space Grotesk', sans-serif", weight: 'bold' },
                        color: labelColor
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 11, family: "'Space Grotesk', sans-serif" },
                        boxWidth: 10,
                        padding: 20,
                        color: labelColor
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateChart();
});
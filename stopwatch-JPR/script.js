class ProChronoElite {
    constructor() {
        this.time = 0;
        this.isRunning = false;
        this.mode = 'stopwatch';
        this.laps = [];
        this.lastTick = 0;
        this.audio = new (window.AudioContext || window.webkitAudioContext)();
        
        this.canvas = document.getElementById('performanceChart');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }

    init() {
        this.setupInputs();
        this.bindEvents();
        this.loadTheme();
        this.updateDisplay();
    }

    setupInputs() {
        const inputs = ['h-input', 'm-input', 's-input'];
        inputs.forEach((id, idx) => {
            const el = document.getElementById(id);
            
            // 1. Filtrar letras y caracteres especiales
            el.addEventListener('keypress', (e) => {
                if (!/[0-9]/.test(e.key)) e.preventDefault();
            });

            // 2. Reactividad en tiempo real y validación
            el.addEventListener('input', (e) => {
                let val = parseInt(el.value) || 0;
                
                // Limitar MM y SS a 59
                if (id !== 'h-input' && val > 59) el.value = "59";
                if (id === 'h-input' && val > 99) el.value = "99";

                // Auto-tabbing (si escribe 2 dígitos, salta al siguiente)
                if (el.value.length === 2 && idx < 2) {
                    document.getElementById(inputs[idx + 1]).focus();
                }

                this.syncFromInputs();
            });
        });
    }

    syncFromInputs() {
        if (this.isRunning) return;
        const h = parseInt(document.getElementById('h-input').value) || 0;
        const m = parseInt(document.getElementById('m-input').value) || 0;
        const s = parseInt(document.getElementById('s-input').value) || 0;
        this.time = (h * 3600 + m * 60 + s) * 1000;
        this.updateDisplay();
    }

    bindEvents() {
        document.getElementById('btn-start').onclick = () => this.toggle();
        document.getElementById('btn-reset').onclick = () => this.reset();
        document.getElementById('btn-lap').onclick = () => this.recordLap();
        document.getElementById('theme-toggle').onclick = () => this.toggleTheme();
        document.getElementById('btn-export').onclick = () => this.exportCSV();

        document.getElementById('tab-stopwatch').onclick = () => this.setMode('stopwatch');
        document.getElementById('tab-countdown').onclick = () => this.setMode('countdown');

        document.querySelectorAll('.add-time').forEach(btn => {
            btn.onclick = () => {
                const mins = parseInt(btn.dataset.min);
                this.time += mins * 60000;
                this.updateInputsFromTime();
                this.updateDisplay();
            };
        });
    }

    updateInputsFromTime() {
        const h = Math.floor(this.time / 3600000);
        const m = Math.floor((this.time % 3600000) / 60000);
        const s = Math.floor((this.time % 60000) / 1000);
        
        document.getElementById('h-input').value = h > 0 ? String(h).padStart(2, '0') : "";
        document.getElementById('m-input').value = m > 0 ? String(m).padStart(2, '0') : "";
        document.getElementById('s-input').value = s > 0 ? String(s).padStart(2, '0') : "";
    }

    setMode(m) {
        this.mode = m;
        this.reset();
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`tab-${m}`).classList.add('active');
        document.getElementById('countdown-setup').classList.toggle('hidden', m !== 'countdown');
        document.getElementById('btn-lap').classList.toggle('hidden', m === 'countdown');
    }

    toggle() {
        if (!this.isRunning) {
            if (this.mode === 'countdown' && this.time <= 0) return alert("Configura un tiempo");
            this.isRunning = true;
            this.lastTick = performance.now();
            this.tick();
        } else {
            this.isRunning = false;
        }
        this.updateUI();
        this.beep(600, 0.05);
    }

    tick() {
        if (!this.isRunning) return;
        const now = performance.now();
        const delta = now - this.lastTick;
        this.lastTick = now;

        if (this.mode === 'stopwatch') {
            this.time += delta;
        } else {
            this.time = Math.max(0, this.time - delta);
            if (this.time === 0) {
                this.isRunning = false;
                this.updateUI();
                this.beep(400, 0.5);
                alert("¡Tiempo finalizado!");
            }
        }
        this.updateDisplay();
        requestAnimationFrame(() => this.tick());
    }

    recordLap() {
        if (this.mode !== 'stopwatch' || this.time === 0) return;
        const duration = this.laps.length > 0 ? this.time - this.laps[0].total : this.time;
        const lap = {
            id: this.laps.length + 1,
            total: this.time,
            duration: duration,
            delta: this.laps.length > 0 ? duration - this.laps[0].duration : 0
        };
        this.laps.unshift(lap);
        this.renderLaps();
        this.drawChart();
    }

    drawChart() {
        const data = [...this.laps].reverse().map(l => l.duration);
        if (data.length < 2) return;
        const w = this.canvas.width = this.canvas.offsetWidth;
        const h = this.canvas.height = this.canvas.offsetHeight;
        const max = Math.max(...data);
        const min = Math.min(...data);
        this.ctx.clearRect(0, 0, w, h);
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#2196F3';
        this.ctx.lineWidth = 4;
        data.forEach((val, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((val - min) / (max - min || 1) * (h - 40) + 20);
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
    }

    updateDisplay() {
        const ms = Math.floor(this.time % 1000);
        const s = Math.floor((this.time / 1000) % 60);
        const m = Math.floor((this.time / 60000) % 60);
        const h = Math.floor(this.time / 3600000);
        const p = (n) => String(n).padStart(2, '0');
        document.getElementById('display').innerHTML = `${p(h)}:${p(m)}:${p(s)}<span class="ms">.${String(ms).padStart(3, '0')}</span>`;
    }

    updateUI() {
        const btn = document.getElementById('btn-start');
        btn.textContent = this.isRunning ? 'Pausar' : 'Iniciar';
        btn.className = `btn-main ${this.isRunning ? 'pause' : 'start'}`;
    }

    reset() {
        this.isRunning = false;
        this.time = 0;
        this.laps = [];
        this.updateDisplay();
        this.updateUI();
        this.updateInputsFromTime();
        document.getElementById('laps-body').innerHTML = '';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    toggleTheme() {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        document.getElementById('theme-toggle').textContent = next === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', next);
    }

    loadTheme() {
        const saved = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', saved);
        document.getElementById('theme-toggle').textContent = saved === 'dark' ? '🌙' : '☀️';
    }

    beep(f, d) {
        const o = this.audio.createOscillator();
        const g = this.audio.createGain();
        o.connect(g); g.connect(this.audio.destination);
        o.frequency.value = f;
        g.gain.setValueAtTime(0.1, this.audio.currentTime);
        o.start(); o.stop(this.audio.currentTime + d);
    }

    renderLaps() {
        document.getElementById('laps-body').innerHTML = this.laps.map(l => `
            <tr><td>${l.id}</td><td>${(l.total/1000).toFixed(2)}s</td>
            <td style="color:${l.delta > 0 ? 'var(--danger)' : 'var(--primary)'}">${l.delta > 0 ? '+' : ''}${(l.delta/1000).toFixed(2)}s</td></tr>
        `).join('');
    }

    exportCSV() {
        const csv = "ID,Tiempo(ms)\n" + this.laps.map(l => `${l.id},${l.total}`).join("\n");
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'laps.csv'; a.click();
    }
}

new ProChronoElite();
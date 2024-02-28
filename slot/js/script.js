document.addEventListener('DOMContentLoaded', function() {
    const creditsElement = document.getElementById('credits');
    const spinButton = document.getElementById('spinButton');
    const quitButton = document.getElementById('quitButton');
    const resultDiv = document.getElementById('result');

    const slotMachine = {
        symbols: ['7', 'BAR', 'Cherry', 'Bell', 'Orange'],
        payTable: {
            '7': {3: 100, 2: 50, 1: 10},
            'BAR': {3: 50, 2: 20, 1: 5},
            'Cherry': {3: 40, 2: 10, 1: 2},
            'Bell': {3: 30, 2: 5, 1: 1},
            'Orange': {3: 20, 2: 3, 1: 1}
        },
        spin: function() {
            return [this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    this.symbols[Math.floor(Math.random() * this.symbols.length)]];
        },
        calculatePayout: function(result) {
            const symbolCounts = {};
            result.forEach(symbol => {
                if (!symbolCounts[symbol]) symbolCounts[symbol] = 0;
                symbolCounts[symbol]++;
            });

            let totalPayout = 0;
            for (const symbol in symbolCounts) {
                const count = symbolCounts[symbol];
                totalPayout += this.payTable[symbol][count] || 0;
            }
            return totalPayout;
        }
    };

    let credits = 1000;
    const betAmount = 10;

    function updateCreditsDisplay() {
        creditsElement.textContent = credits;
    }

    function displayResult(result, payout) {
        resultDiv.textContent = `Resultado do giro: ${result.join(' | ')}\n`;
        if (payout > 0) {
            resultDiv.textContent += `Você ganhou ${payout} créditos!`;
        } else {
            resultDiv.textContent += 'Você não ganhou nada. Tente novamente!';
        }
    }

    spinButton.addEventListener('click', function() {
        if (credits >= betAmount) {
            const result = slotMachine.spin();
            const payout = slotMachine.calculatePayout(result);
            credits += payout - betAmount;
            updateCreditsDisplay();
            displayResult(result, payout);
        } else {
            alert('Você não tem créditos suficientes para fazer essa aposta.');
        }
    });

    quitButton.addEventListener('click', function() {
        alert('Obrigado por jogar!');
        window.close(); // Fechar a janela do navegador
    });

    updateCreditsDisplay();
});

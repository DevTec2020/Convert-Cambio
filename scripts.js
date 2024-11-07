// Cotação de moedas do dia 28/10/2024
const USD = 5.71
const EUR = 6.17
const GBP = 7.41

//Obtendo os elementos
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById("description")
const result = document.getElementById("result")


//Verificando o input amount para receber apenas números 
amount.addEventListener("input", () => {
   const hasCharactersRegex = /\D+/g 
   amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de Submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
        break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
        break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
        break
    }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula o Toatal
        let total = amount * price

        //verifica se o resultado não é um número
        if (isNaN(total)){
            return alert("Por favor, digite o valor corretamente para converter. ")
        }

        // Formata o valor total
        total = formatCurrencyBRL(total).replace("R$","")

        //Exibe o resultado total
        result.textContent = `${total} Reais`

        // Adiciona a classe que exime o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch (error) {
        //Remove a classe do footer removendo ele da tela.
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possivel converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em REal Brasileiro
function formatCurrencyBRL(value){
    // Converte o dado para número, assim da para utilizar o toLocaleString e formatar no padrão BRL (R$ 00,00).
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}
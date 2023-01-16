import axios from "axios";

/**
 * TDD is necessary to 
 * given, when, then --- arrange, act, assert
 */

test("Deve criar uma transação", async function () {
  const code = `${Math.floor(Math.random() * 1000)}`

  await axios({
    url: 'http://localhost:3000/transactions',
    method: "post",
    data: {
      code,
      amount: 1000,
      numberInstallments: 12,
      paymentMethod: "credit_card"
    }
  })

  const response = await axios({
    url: `http://localhost:3000/transactions/${code}`,
    method: "get",
  })

  const transaction = response.data
  expect(transaction.code).toBe(code)
  expect(transaction.amount).toBe(1000)
  expect(transaction.paymentMethod).toBe("credit_card");


});
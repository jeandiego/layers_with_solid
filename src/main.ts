import express, {Request, Response } from "express"
import pgp from 'pg-promise'

const app = express();

app.use(express.json())
app.post('/transactions', async function (req: Request , res: Response) {
  const connection = pgp()('postgres://postgres:example@localhost:5432/app');
  await connection.query('insert into transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)', [req.body.code, req.body.amount, req.body.numberInstallments, req.body.paymentMethod])
  await connection.$pool.end()
  res.send();
})

app.get("/transactions/:code", async function (req: Request ,res: Response) {
  const connection = pgp()('postgres://postgres:example@localhost:5432/app');
  const transaction = await connection.one("select * from transaction where code = $1", [req.params.code])
  console.log(transaction)
  transaction.amount = parseFloat(transaction.amount);
  transaction.paymentMethod = transaction.payment_method
  await connection.$pool.end()
  res.json(transaction)
});

app.listen(3000)
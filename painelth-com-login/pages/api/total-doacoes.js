import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: 'APP_USR-5431570390978701-041315-32076f4e4911ecd28d1daecbfa133e35-307004460'
});

export default async function handler(req, res) {
  try {
    const pagamentos = await mercadopago.payment.search({
      qs: { status: 'approved' }
    });

    const total = pagamentos.response.results.reduce(
      (soma, p) => soma + p.transaction_amount,
      0
    );

    res.status(200).json({ total });
  } catch (erro) {
    console.error('Erro ao buscar pagamentos:', erro);
    res.status(500).json({ erro: 'Erro ao buscar doações' });
  }
}

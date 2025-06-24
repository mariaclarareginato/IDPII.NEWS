const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'SEGREDO') {
        next(); // se autenticado
    } else {
        res.status(401).send('Acessado Negado/Não autorizado')
    }
};

export default authMiddleware;
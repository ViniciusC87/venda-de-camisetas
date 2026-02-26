module.exports = (req, res, next) => {
    // Pegamos tanto o Token quanto o Role para não ter erro de bloqueio
    const authHeader = req.headers['authorization'];
    const role = req.headers['user_role'];

    // Se você estiver enviando o Token (como está no seu Angular) ou o Role, ele libera
    if (authHeader || role === 'admin') {
        return next();
    }

    // Se não enviar nada, ele avisa
    return res.status(403).json({ error: 'Acesso negado. Token não encontrado.' });
};
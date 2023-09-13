import jwt from "jsonwebtoken";
export const cookieJwtAuth = (req, res, next) => {
    try {
        if (process.env.SECRET_KEY) {
            const header = req.headers['authorization'];
            console.log("test", header);
            if (typeof header !== 'undefined') {
                const bearer = header.split(' ');
                const authToken = bearer[1];
                jwt.verify(authToken, process.env.SECRET_KEY, (err, payload) => {
                    if (err) {
                        return res.status(403).json({
                            message: err
                        });
                    }
                    req.payload = payload;
                    next();
                });
            }
            else {
                res.sendStatus(403);
            }
        }
        else {
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }
    catch (err) {
        res.clearCookie('token');
        res.redirect("/");
    }
};
//# sourceMappingURL=cookieJwtAuth.js.map
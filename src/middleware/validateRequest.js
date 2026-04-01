export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {

            const formatted = result.error.format();

            const flatErrors = Object.keys(formatted)
                .flat()
                .filter(Boolean)
                .map((err) => err._errors)
                .flat();

            return res.status(400).json({ message: "Validation failed", errors: flatErrors });
        }

        next();
    };
};
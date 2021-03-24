exports.    isDoctor = (req, res, next) => {
    // console.log(req.identity);
    try {
        if(req.identity === "D"){
            next()
        }
        else{
            throw new Error("User can not Access this API")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.isLab = (req, res, next) => {
    // console.log(req.identity);
    try {
        if(req.identity === "L"){
            next()
        }
        else{
            throw new Error("User can not Access this API")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.isMedical = (req, res, next) => {
    // console.log(req.identity);
    try {
        if(req.identity === "M"){
            next()
        }
        else{
            throw new Error("User can not Access this API")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.isPatient = (req, res, next) => {
    // console.log(req.identity);
    try {
        if(req.identity === "P"){
            next()
        }
        else{
            throw new Error("User can not Access this API")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.isAdmin = (req, res, next) => {
    // console.log(req.identity);
    try {
        if(req.identity === "A"){
            next()
        }
        else{
            throw new Error("User can not Access this API")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}
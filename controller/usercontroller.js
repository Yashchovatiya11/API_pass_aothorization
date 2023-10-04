var user_model = require('../model/usermodel');

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.register_user = async (req, res) => {

    try {

        var data = await user_model.find({ email: req.body.email });

        if (data.length == 1) {

            res.status(200).json({
                status: 'user is already registeres'
            })

        }

        else {

            var b_pass = await bcrypt.hash(req.body.password, 12);

            req.body.password = b_pass;

            var data = await user_model.create(req.body);

            res.status(200).json({
                status: 'registerd success',
                data
            });
        }

    } catch (error) {

        res.status(200).json({
            status: error.status
        })
    }
}

exports.login_user = async (req, res) => {

    var userlogin = await user_model.find({ email : req.body.email});

    if (userlogin.length == 1) 
    {
        bcrypt.compare(req.body.password, userlogin[0].password, function(err, result) {

            if (result == true)
            {

                var token = jwt.sign({ id: userlogin[0].id }, 'yash');

                res.status(200).json({
                    status:"login success",
                    token
                })
            }

            else 
            {
                res.status(200).json({
                    status:"check your email and password"
                })
            }
        });
    }
    else 
    {
        res.status(200).json({
            status:"check your email and password"
        })
    } 

};

exports.get_login_user = async (req, res) => {

    try {
        
        var data = await user_model.find();

        res.status(200).json({
            data
        })

    } catch (error) {
        
        res.status(200).json({
            status : error.status
        })

    }

}

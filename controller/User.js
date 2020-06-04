const userModel = requiere('../model/User.js')
const response = requiere('../config/response')
const  bcrypt = requiere('bcyrpt')


exports.registrasi = (data) =>
    new Promise((resolve, reject =>
        userModel.findOne({userName: data.userName})
            .then(user => {
                if (user){
                    resolve(response.commonErrorMsg( msg: 'Username sudah digunakan'))
                    }else  {
                    bcrypt.hash(data.password, salt:10, (err, hash) =>){
                        if (err) {
                            reject(response.commonErrorMsg)
                        }else {
                            data.password = hash
                            userModel,create(data)
                                .then(() => resolve(response.commonSuccess( msg: 'Berhasil Registrasi')))
                            .catch(() => reject(response.commonErrorMsg( msg: 'Mohon Maaf Registrasi Gagal')))
                        }
                        }
                    })
                }
            }).catch(() => reject(response.commonErr))
    }))
exports.login = (data) =>
    new Promise((resolve, reject)) => {
    userModel.findOne({
        userName: data.userName({
        }).then(user => {
            if(user) {
                if (bcrypt.compareSync(data.passwors, user.passwors)) {
                    resolve(response.commonResult(user))
                }else{
                    reject(response.commonErrorMsg( msg : 'Password salah'))
                }
            }else{
                  reject(response.commonErrorMsg( msg : 'Username tidak ditemukan'))
                }

        })
    })
}
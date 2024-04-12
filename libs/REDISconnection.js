const RedisAux = require('ioredis')
const chalk = require('chalk')

const redisOptions = {
    host: process.env.REDIS_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    options: {},
    retry_strategy(options) {
        console.log('[Redis] going to reconnect after: ' + Math.min(options.attempt * 100, 3000))
        return Math.min(options.attempt * 100, 3000)
    }
}

const redisClientAux = new RedisAux(redisOptions)

redisClientAux.on('ready', () => {
    console.log(chalk.blue.bold(`---------- REDIS ENVIRONNEMENT: ------- ${process.env.NODE_ENV} -------`))
    console.log(chalk.green.italic('[REDIS] REDIS is now ready on :', process.env.REDIS_URL))
})

const middlewareCacheClean = () => {
    return (req, res, next) => {
        //console.log("middlewareCacheClean");
        //console.log(req.method);

        if(req.method !== 'GET') {
            let keyFirebaseUid = '_cached_' + req.originalUrl + '_' + res.locals.firebase_uid
            let keyPublic = '_cached_' + req.originalUrl
            
            //console.log('[REDIS] Removing key ' + keyFirebaseUid);
            redisClientAux.del(keyFirebaseUid).then(() => {
                //console.log(result);

                //console.log('[REDIS] Removing key ' + keyPublic);
                redisClientAux.del(keyPublic).then(() => {
                    //console.log(result);
                    next()
                }, () => {
                    //console.error(err);
                    next()
                })
            }, () => {
                //console.error(err);
                next()
            })
        } else {
            next()
        }
    }
}

const middlewareCacheData = (duration, useUserUid = false) => {
    return (req, res, next) => {
        //console.log("middlewareCacheData");

        let key = useUserUid ? '_cached_' + req.originalUrl + '_' + res.locals.firebase_uid : '_cached_' + req.originalUrl
        //console.log(key);
        
        redisClientAux.get(key).then((result) => {
            //console.log(result);
            if (result) {
                let resultParsed = JSON.parse(result)
                //console.log('[REDIS] Found key ' + key);
                res.header('Content-Type','application/json')
                res.header('X-Is-Cached','Yes')
                res.send(resultParsed)
                return 
            } else {
                let end = res.end
                res.end = (chunk, encoding) => {
                    //console.log('[REDIS] Res ' + res.statusCode);
                    
                    if (res.statusCode < 300) {
                        //console.log('[REDIS] Set key ' + key);
                        redisClientAux.set(key, chunk, duration)
                    }
                    res.end = end
                    res.end(chunk, encoding)
                    return
                }
                next()
            }
            
        }, () => {
            //console.log(err);
            next()
        })
    }
}

const deleteCacheData = () => {
    redisClientAux.flush().then(() => {
        return 
    })
}

module.exports = {
    redisClient: redisClientAux.redisClient,
    redisClientAux: redisClientAux,
    middlewareCacheData: middlewareCacheData,
    middlewareCacheClean: middlewareCacheClean,
    deleteCacheData: deleteCacheData,
    em: redisClientAux
}

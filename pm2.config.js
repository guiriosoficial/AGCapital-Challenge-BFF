const pm2Config = {
    apps: [
        {
            name: 'configurations-bff',
            script: 'src/main.ts',
            exec_mode: 'cluster_mode',
            instances: 2,
            interpreter: '/usr/local/bin/ts-node',
            env: {
                NODE_ENV: 'production',
            }
        },
    ],
}

module.exports = pm2Config

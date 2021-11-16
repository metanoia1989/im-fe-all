module.exports = {
    /**
     * 获取资源完整路径
     * @param {string} uri 
     * @returns 
     */
    getFileUrl(uri = '') {
        if (uri.includes('http://')) return uri;
        if (uri.includes('https://')) return uri;

        const { domain } = this.app.config.fileStorage;

        return `${domain}${uri}`;
    },
    /**
     * 获取资源相对路径
     * @param {string} uri 
     * @returns 
     */
    setFileUrl(uri = '') {
        const { domain } = this.app.config.fileStorage;
        return uri.replace(domain, '');
    },

    /**
     * 返回密码hash
     * @param {string} password 
     * @returns 密码hash 
     */
    createPassword(password) {
        const crypto = require('crypto');
        const secret = this.app.config.userConfig.secret;
        return crypto.createHmac('sha256', secret).update(password).digest('hex')
    }
};
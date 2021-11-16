module.exports = {
    getFileUrl(uri = '') {
        if (uri.includes('http://')) return uri;
        if (uri.includes('https://')) return uri;

        const { domain } = this.app.config.fileStorage;

        return `${domain}${uri}`;
    }
};
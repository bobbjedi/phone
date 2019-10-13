import Fs from './fs';

export default (params)=>{
    const modules = {
        fs: new Fs(params.rootDir)
    };
    document.addEventListener('deviceready', async () => {
        Object.keys(modules).forEach(m=>m.init());
    });
    return modules;
};


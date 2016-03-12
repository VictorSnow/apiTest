define(['config'], function(config){
    return {
        'name':'账户相关',
        'buttons': [
            {
                name: '登陆',
                form: {
                    action: '/account/login',
                    method: 'post',
                    items:[
                        {name:'phone', value:''},
                        {name:'password', value:''},
                        {name:'type', value:''},
                        {name:'jpush_id', value:''},
                        {name:'platform', value:''}
                    ]
                }
            },
            {
                name: '注册',
                form: {
                    action: '/account/register',
                    method: 'post',
                    items:[
                        {name:'phone', value:''},
                        {name:'password', value:''},
                        {name:'checksum', value:''},
                        {name:'type', value:''},
                        {name:'invite_code', value: ''},
                        {name: 'channel', value:''}
                    ]
                }
            },
            {
                name: '找回密码',
                form: {
                    action: '/account/findpwd',
                    method: 'post',
                    items:[
                        {name:'phone', value:''},
                        {name:'password', value:''},
                        {name:'checksum', value:''}
                    ]
                }
            },
            {
                name: '更新密码',
                form:{
                    action: '/account/resetpassword',
                    method: 'post',
                    items:[
                        {name: 'oldPassword', value: ''},
                        {name: 'checksum', value: ''},
                        {name: 'password', value: ''}
                    ]
                }
            },
            {
                name: '获取验证码',
                form: {
                    action: '/account/GetChecksum',
                    method: 'post',
                    items:[
                        {name:'phone', value:''},
                        {name:'type', value:''}
                    ]
                }
            },
            {
                name: '验证验证码',
                form: {
                    action: '/account/Checkchecksum',
                    method: 'post',
                    items:[
                        {name:'phone', value:''},
                        {name:'checksum', value:''}
                    ]
                }
            }
        ]
    };
});
import requests
import json
 
 
def get_xml_test():
    """get请求http"""
    url = "http://127.0.0.1:8080/index.html"
    res = requests.get(
        url=url
    )
    print(res.status_code)
    print(res.url)
    print(res.text)  # 字符串
    # print(res.content)  # byte格式
 
 
def get_json_text():
    """get请求json"""
    url = "http://127.0.0.1:8080/index.html"
    res = requests.get(url)
    print(res.url)
    print(res.status_code)
 
    res_str = res.text
    res_list = json.loads(res_str)  # 加载为json格式
    # pprint(res_list)       # pprint()打印json内容格式更美观
    print(len(res_list))  # 30个字典{}内容
    # print(res.content)  # byte格式字符串内容list[{字典1},{字典2},...]
    # print(res_str)
 
    # 遍历list[]中每个字典的内容
    for dict in res_list:
        # print(dict["id"])
        if dict["type"] == "PushEvent":
            print(dict)
 
 
def test_post_login(username, password):
    """
    post 登录
    :param username: 用户名
    :param password: 密码
    :return: 登录成功，http code 返回200
    """
    post_url = "http://127.0.0.1:8080/index.html"
    data = {
        # "username":"******@163.com",
        # "password":"******",
        "username": username,
        "password": password,
        "verify_code": "111111"
    }
    headers = {
        "Referer": "http://www.testingedu.com.cn:8000/Home/user/login.html",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Origin": "http://www.testingedu.com.cn:8000",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36",
        "Content-Length": "65",
        "Host": "www.testingedu.com.cn:8000"
    }
    
    res = requests.post(url=post_url, data=data, headers=headers)
 
 
    # 获取返回状态
    assert res.status_code == requests.codes.ok, "请求成功！"
    # print(res.status_code)
    # print(res.text)
    dict_res = json.loads(res.content.decode())
    print(dict_res)
    print(dict_res['result']['user_id'])
    assert (dict_res['status'] == 1) and (dict_res['msg'] == '登陆成功')
 
 
def main():
    # get_xml_test()  # 打开登录页
    # get_json_text()
    test_post_login("******@163.com", "******")
    # test_post_login("******@163.com", "******")
    # test_post_login("******@126.com", "******")
 
 
if __name__ == "__main__":
    main()
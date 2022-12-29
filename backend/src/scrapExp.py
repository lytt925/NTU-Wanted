import requests
import os
import re
from os import listdir
from os import makedirs
from bs4 import BeautifulSoup
import json

expUrl = 'http://www.psy.ntu.edu.tw/index.php/homepage/psy-experiments'
location = 'http://www.psy.ntu.edu.tw'

response = requests.get(expUrl)
soup = BeautifulSoup(re.sub('[\t\n\r]', '', response.text))
titles = [re.sub('\s+', '', e.text) for e in soup.select('.catItemTitle a')]
urls = [location+e['href'] for e in soup.select('.catItemTitle a')]

def findEmail(soup):
    raw  = soup.select_one('.itemExtraFieldsValue script').text
    first = re.search('addy(.*)document.write', raw).group(1)
    # print(first)
    parsed = re.findall(r"'(.*?)'", first)[:5]
    lst = re.findall(r'&#(\d+);', parsed[0])
    toReplace = list(map(lambda x: chr(int(x)), lst))
    email = ''
    for string in parsed:
        lst = re.findall(r'&#(\d+);', string)
        toReplace = list(map(lambda x: chr(int(x)), lst))
        for old, new in zip(lst, toReplace):
            string = re.sub('&#'+old+';', new, string)
        email+=string
    return email

def genExpInfo(title, url):
    response = requests.get(url)
    soup = BeautifulSoup(re.sub('[\t\n\r]', '', response.text))
    content = soup.select('.itemExtraFields li')
    expInfo = dict()
    for item in content:
        children = item.children
        key = next(children).text
        value = next(children).text.replace('\xa0', '\n')
        expInfo[key] = value
    expInfo['title'] = title
    contact = expInfo['實驗者聯絡方式:']
    phone=re.search('聯絡電話：(.*)電子郵件',contact).group(1).strip(' ')
    email=findEmail(soup)
    expInfo['phone'] = phone
    expInfo['email'] = email
    expInfo.pop('實驗者聯絡方式:', None)
    return expInfo

AllExpList = []
for i,url in enumerate(urls):
    expInfo = genExpInfo(titles[i], url)
    AllExpList.append(expInfo)

with open ('data.json', 'w', encoding="utf8") as file:
    json.dump(AllExpList, file, ensure_ascii=False)
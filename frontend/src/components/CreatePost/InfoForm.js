import React from 'react';
import { Button, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import "./infoForm.css";
import { useNavigate } from 'react-router-dom';
import axios from '../../containers/api';
import { useUser } from '../../containers/hooks/useUser';
import { Card } from 'antd'
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

const { RangePicker } = DatePicker;
const { Option } = Select;

// const layout = {
//     labelCol: { xs:{span: 6, offset: 0 }, sm:{span: 3, offset: 6} },
//     wrapperCol: { xs:{span: 6, offset: 0}, sm: {span: 7, offset: 1} },
// };
const layout = {
    labelCol: {span: 3, offset: 6} ,
    wrapperCol: {span: 10, offset: 1} ,
};
const inputCol =  { span: 8, offset: 1 }


const validateMessages = {
    required: '請填寫您的${label}。',
    types: {
        email: '${label} 不符合電子信箱格式',
    },
};

const BoxCss = {
    px: '25px',
    py: '10px',
    width: {xs:"80%", sm:"80%", lg:"60%"},
    border: "1px solid lightgrey",
    marginBottom: "30px",
    position: "absolute",
    left: {xs:"10%", sm:"10%", lg:"20%"},
    // backgroundColor:"rgb(253, 244, 219)"
}

// const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//         <Select style={{ width: 70 }}>
//             <Option value="86">+86</Option>
//             <Option value="87">+87</Option>
//         </Select>
//     </Form.Item>
// );

const InfoForm = () => {

    const c = useUser();

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

    const submitForm = async (values) => {
        const { data: { message } } =
            await axios.post("/postForm", { values, c })

        if (message === 'success') {
            navigateToHome();
        }
        else {
        }
    }

    const onFinish = (fieldsValue) => {

        const rangeValue = fieldsValue['time'];
        const values = {
            ...fieldsValue,
            'age': { upper: fieldsValue['upper'], lower: fieldsValue['lower'] },
            'time': `${rangeValue[0].format('YYYY年MM月DD日')} 至 ${rangeValue[1].format('YYYY年MM月DD日')} 止`,
            'timeRange': { from: rangeValue[0].format('YYYY/MM/DD'), to: rangeValue[1].format('YYYY/MM/DD') },
        };

        submitForm(values);

    }


    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';


    return (
        // <Card style={{ width: "60%", position:"absolute", left: "20%", 
        // px: '25px',
        // py: '10px',
        // border: "1px solid lightgrey",
        // marginBottom: "10px"}}>
        <>
        <Box sx={BoxCss} component={Paper}>
            <h2>新增研究</h2>
        <Form {...layout} form={form} id='infoForm' name="infoForm" 
                onFinish={onFinish} validateMessages={validateMessages}
                style={{width:"100%"}}
                scrollToFirstError={true}>
            <div className='infoBox'>
                <div className='infoName'><h3>基本資料</h3></div>
                <Form.Item name='experimenter' label="研究單位" rules={[{ required: true }]}
                    wrapperCol={inputCol}>
                    <Input placeholder="請填寫單位或聯絡人名稱" />
                </Form.Item>
                <Form.Item name='email' label="Email" rules={[{ type: 'email', required: true }]} wrapperCol={inputCol}>
                    <Input />
                </Form.Item>
                <Form.Item name='phone' label="聯絡電話" wrapperCol={inputCol}>
                    <Input />
                </Form.Item>
                <Form.Item label="研究地點" name="address" rules={[{ required: true }]} >
                    <Input.Group compact>
                        <Form.Item
                            name='locationTags'
                            noStyle
                            rules={[{ required: true, message: "請選擇研究地點" }]}
                        >
                            <Select placeholder="選擇區域" onChange={(value) => { form.setFieldsValue({ address: value }) }}>
                                <Option value="校總區">校總區</Option>
                                <Option value="城中校區">城中校區</Option>
                                <Option value="線上">線上</Option>
                                <Option value="其他">其他</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name='location'
                            noStyle
                            rules={[{ required: true, message: "請填完整地址" }]}
                        >
                            <Input style={{ width: '50%' }} placeholder="完整地址" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            </div>
            <div className='infoBox'>
                <div className='infoName'><h3>受試者條件</h3></div>
                <Form.Item name='age' label="年齡" tooltip='無限制最低年齡請填0，無限制最高年齡請填99'
                    style={{ marginBottom: 0 }}
                    >
                    <div>
                        <Form.Item name='lower' style={{ display: 'inline-block'}}
                            rules={[{ type: 'number', min: 0, max: 99, message: "請填寫介於0-99的數字" }]}
                        >
                            <InputNumber placeholder="最低年齡" />
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '10%', textAlign: "center" }}>—</span>
                        <Form.Item name='upper' style={{ display: 'inline-block' }}
                            rules={[{ type: 'number', min: 0, max: 99, message: "請填寫介於0-99的數字" }]}
                        >
                            <InputNumber placeholder="最高年齡" />
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item name='requirements' label="其他條件" >
                    <Input.TextArea />
                </Form.Item>
            </div>

            <div className='infoBox'>
                <div className='infoName'><h3>研究內容</h3></div>
                <Form.Item name='title' label="標題" rules={[{ required: true }]} >
                    <Input />
                </Form.Item>

                <Form.Item name='time' label="研究時間" rules={[{ required: true }]} >
                    <RangePicker placeholder={["開始時間", "結束時間"]} />
                </Form.Item>

                <Form.Item label="研究時長" name="length" rules={[{ required: true, message: "請填寫您的研究時長" }]}
                    wrapperCol={{ span: 4, offset: 1 }}>
                    <InputNumber addonAfter="分鐘" />
                </Form.Item>
                <Form.Item name='reward' label="研究報酬" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='introduction' label="研究簡介" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name='link' label="相關網址" tooltip='可放入問卷、官網連結等' >
                    <Input />
                </Form.Item>
            </div>
            <div className='infoBox'>
                <div className='infoName'><h3>搜尋標籤</h3></div>
                <Form.Item name='typeTags' label="研究類型" rules={[{ required: true }]}
                    >
                    <Select
                        mode="tags"
                        allowClear
                        // style={{ width: '100%' }}
                        placeholder="請選擇或按Enter新增選項"
                        options={[{ label: "實驗", value: "實驗" },
                        { label: "問卷", value: "問卷" },
                        { label: "訪談", value: "訪談" }]}
                    />
                </Form.Item>
                <Form.Item name="rewardTags" label="報酬種類" rules={[{ required: true }]} >
                    <Select
                        mode="tags"
                        allowClear
                        // style={{ width: '100%' }}
                        placeholder="請選擇或按Enter新增選項"
                        options={[{ label: "普心加分", value: "普心加分" },
                        { label: "食物", value: "食物" },
                        { label: "現金", value: "現金" }]}
                    />
                </Form.Item>
                <Form.Item name="otherTags" label="自訂標籤" >
                    <Select
                        mode="tags"
                        // style={{ width: '100%', }}
                        placeholder="請按Enter以新增選項"
                        notFoundContent="輸入後請按Enter鍵以新增標籤"
                        allowClear={true}
                    />
                </Form.Item>
            </div>
            <Form.Item wrapperCol={{xs:{ span:12, offset: 7 },sm:{offset:10}}}>
                <Button type="primary" htmlType="submit" style={{backgroundColor:"#AEC17B"}}>
                    確認送出
                </Button>
            </Form.Item>
        </Form>
        </Box>
        <div style={{height:"100px"}}></div>
        </>
        
    )
}


export default InfoForm;
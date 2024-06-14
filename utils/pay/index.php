<?php
include './Base.php';
include './phpqrcode/phpqrcode.php';


class WeiXinPay extends Base
{
    //模拟数据可以删除该方法
    public function checks(){
           $params = [
            'appid'     =>  '写自己的',
            'mch_id'    =>  '写自己的',
            'body'      =>  '写自己的',
            'sign'   =>  '写自己的'
        ];

        // print_r($params);
        if($this->checkSign($params)){
            echo '签名校验通过';
        }else{
            echo '签名校验失败！';
        }
    }
    //获取构建二维码的URL地址
    public function getQRurl($oid){
        $params = [
            'appid'             => self::APPID,
            'mch_id'            => self::MCHID,
            'product_id' 	=> $oid,
            'time_stamp' 	=> time(),
            'nonce_str' 	=> md5(time()),
        ];
        
      return 'weixin://wxpay/bizpayurl?' . $this->arrToUrl($this->setSign($params));
    }
     
   
}

$obj = new WeiXinPay();
if(isset($_GET['pid'])){
    QRcode::png($obj->getQRurl($_GET['pid']));
   // $obj->logs('log.txt', '0');
}
// echo $obj->getQRurl('12334');
// $obj->checks();
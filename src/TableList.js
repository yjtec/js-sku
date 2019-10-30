import React,{Component} from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {Button ,Icon,Alert,Input,Row,Col,message,Table} from 'antd';
import styles from './style.less';
class SpecTableList extends Component{
  state ={
    sku:[]
  }
  componentDidMount(){
    const {sku} = this.props;
    this.setState({sku});
  }
  handleMulEdit = (key,value,confirm,setSelectedKeys) => {
    const sku = this.state.sku.map((item,i) =>{
      let tmpvalue = value;
      if(key === 'sku'){
        tmpvalue = value +'0000'+(i+1)
      }
      return {...item,[key]:tmpvalue}
    });
    this.setState({sku:sku})
    setSelectedKeys([]);
    confirm();

  }  
  getMulEditProps = dataIndex =>{
    
    return{
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div>
          <Input 
            value={selectedKeys[0]}
            addonAfter={
              <Icon type="check" onClick={()=>this.handleMulEdit(dataIndex,selectedKeys[0],confirm,setSelectedKeys)} />
            }
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] :[])}
          />
        </div>
      ),
      filterIcon:filtered => (
        <Icon type="edit" />
      )
    }
  }  
  render(){
    const columns = [{
      title:formatMessage({id:'goods.spec.spec'}),
      dataIndex:'spec',
      key:'spec',
      width:100
    },{
      title:formatMessage({id:'goods.price.label'}),
      dataIndex:'price',
      key:'price',
      width:120,
      render:(v,r) => <Input value={v} onChange={(e)=>this.handleSkuChange(e,r)}  name="price" />,
      ...this.getMulEditProps('price')
    },{
      title:formatMessage({id:'goods.price_origin.label'}),
      dataIndex:'price_origin',
      width:120,
      key:'price_origin',
      render:(v,r) => <Input value={v} onChange={(e)=>this.handleSkuChange(e,r)}  name="price_origin" />,
      ...this.getMulEditProps('price_origin')
    },{
      title:formatMessage({id:'goods.price_cost.label'}),
      dataIndex:'price_cost',
      width:120,
      key:'price_cost',
      render:(v,r) => <Input value={v} onChange={(e)=>this.handleSkuChange(e,r)}  name="price_cost" />,
      ...this.getMulEditProps('price_cost')
    },{
      title:formatMessage({id:'goods.sku.label'}),
      dataIndex:'sku',
      width:120,
      key:'sku',
      render:(v,r) => <Input value={v} onChange={(e)=>this.handleSkuChange(e,r)} name="sku" />,
      ...this.getMulEditProps('sku')
    }];
    const {sku} = this.state;
    if(sku.length > 0 ){
      return(
        <Table pagination={false} rowKey={'spec'} dataSource={sku} columns={columns} />
      )
    }
    return '';
    
  }
}
export default SpecTableList;
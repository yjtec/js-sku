import React,{Component,Fragment} from 'react';
import {Button ,Icon,Alert,Input,Row,Col,message,Table} from 'antd';
import styles from './style.less';
import uuid from 'uuid';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
function calcDescartes (array) {
    if (array.length < 2) return array[0] || [];
    return [].reduce.call(array, function (col, set) {
        var res = [];
        col.forEach(function (c) {
            set.forEach(function (s) {
                var t = [].concat(Array.isArray(c) ? c : [c]);
                t.push(s);
                res.push(t);
            })
        });
        return res;
    });
}

const formatSku = (data,sku) => {
    const result = [];
    data.map(item => {
      if(item.items.length){
        result.push(item.items.filter(i => i));
      }
    })
    return calcDescartes(result)
      .map(item => Array.isArray(item) ? {spec:item.join('*'),attr:item}:{spec:item,attr:[item]})
      .map(item => {
        const currentSku = sku.find(s => s.spec === item.spec) || {};
        return {
          ...item,
          ...currentSku
        }
      })
}
class GoodsSpec extends Component{
  constructor(props) {
    super(props);
    this.state = {
      specs:[],
      sku:[]
    }
  }
  componentDidMount(){
    const {value} = this.props;
    this.setState({
      ...value,
      sku:value.sku && value.sku.length > 0 ? value.sku.map(item => ({...item,spec:item.spec.join('*')})) : []
    },()=>{
      this.props.onChange(this.state);
    });
  }
  handleSkuChange = (e,sku) => {
    const key = e.target.name;
    const value = e.target.value;
    sku[key] = value;
    const newsku = this.state.sku.map(item => item.spec === sku.spec ? sku : item);
    this.setState({
      sku:newsku
    },()=>{
      this.props.onChange(this.state);
    })
  }
  handleMulEdit = (key,value,confirm,setSelectedKeys) => {
    const sku = this.state.sku.map((item,i) =>{
      let tmpvalue = value;
      if(key === 'sku'){
        tmpvalue = value +'0000'+(i+1)
      }
      return {...item,[key]:tmpvalue}
    });
    this.setState({sku:sku},()=>{
      this.props.onChange(this.state);
    })
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

  columns = [{
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
  }]
  handleAddSpec = () =>{
    const {specs} = this.state;
    if(specs.length > 2){
      message.error(formatMessage({id:'goods.spec.lengthError'}))
      return ;
    }
    
    const newSpec = {
      uid:uuid(),
      items:[]
    }
    specs.push(newSpec);
    this.setState({specs});
  }
  handleRemoveSpec = uid => {
    const {specs,sku} = this.state;
    const newSpecs = specs.filter(item => item.uid !== uid);
    this.setState({
      specs:newSpecs,
      sku:formatSku(newSpecs,sku)
    },()=>{
      this.props.onChange(this.state);
    });
    //this.setState({specs:specs.map(item => item.uid !== uid)})
  }
  handleAddItem = spec => {
    const {specs} = this.state;
    //check length
    if(spec.items.length > 4){
      message.error(formatMessage({id:'goods.spec.items.lengthError'}))
      return;
    }
    //check name repeat
    const newSpecs = specs.map(item => {
      if(item.uid == spec.uid){
        item.items.push('');
        return {...item}
      }else{
        return item;
      }
    })

    this.setState({specs:newSpecs});
  }
  handleRemoveItem = (spec,i) => {
    const {specs,sku} = this.state;
    const newSpecs = specs.map(item => {
        if(item.uid == spec.uid){
        item.items.splice(i,1);
        return {...item}
      }else{
        return item;
      }      
    })
    this.setState({
      specs:newSpecs,
      sku:formatSku(newSpecs,sku)
    },()=>{
      this.props.onChange(this.state);
    });
  }
  handleItemChange = (e,spec,i) => {
    const {specs,sku} = this.state;
    const newSpecs = specs.map(item => {
        if(item.uid == spec.uid){
        item.items[i] = e.target.value;
        return {...item}
      }else{
        return item;
      }
    })
    this.setState({
      specs:newSpecs,
      sku:formatSku(newSpecs,sku)
    },()=>{
      this.props.onChange(this.state);
    });
  }
  handleSpecNameChange = (e,spec) => {
    spec.name = e.target.value;
    const specs = this.state.specs.map(item => item.uid == spec.uid ? spec:item);
    
    this.setState({specs},()=>{
      this.props.onChange(this.state);
    })
  }
  renderItem = spec => (
    <div>
      <div className={styles.spec_title}>
        <Input placeholder="属性名" onBlur={(e)=>this.handleSpecNameChange(e,spec)} defaultValue={spec.name} />
      </div>
      <div className={styles.spec_list}>
        <Row>
          {spec.items.map((item,i) => 
            <Col span={4} key={i}>
              <Input
                onBlur={(e) => this.handleItemChange(e,spec,i)}
                className={styles.itemInput}
                defaultValue={item}
                placeholder="属性值"
                suffix={<Icon onClick={()=>this.handleRemoveItem(spec,i)} type="close" />}
              />
            </Col>
          )}
          <Col span={4}>
            <Button  type="circle" onClick={() =>this.handleAddItem(spec)} icon="plus" />
          </Col>
        </Row>
      </div>
    </div>
  )
  renderSpec = () => (
    <Fragment>
    {this.state.specs.map(item => 
      <Alert
        style={{margin:'10px 0'}}
        key={item.uid}
        closable
        message={this.renderItem(item)} 
        onClose={()=>this.handleRemoveSpec(item.uid)}
      />
    )}
    </Fragment>
  )
  render(){
    const {
      specs,
      sku
    } = this.state;

    return(
        <div>
          <Button onClick={this.handleAddSpec} type="circle" icon="plus" />
          {this.renderSpec()}
          {sku.length > 0 && <Table pagination={false} rowKey={'spec'} dataSource={sku} columns={this.columns} />}
          
        </div>
    )
  }
}
export default GoodsSpec;
import React from 'react'

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (<tr>
            <th colSpan='2'>{category}</th>
        </tr>)
    }
}
class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>
        return (<tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>)
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        const rows = [];
        let lastCategory = null;
        this.props.products.forEach(product => {
            // 搜索不到的情况
            if (product.name.indexOf(filterText) === -1) {
                return
            }
            // 搜索的里面没有库存 选中仅显示有库存的
            if (inStockOnly && !product.stocked) {
                return
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
            }
            rows.push(<ProductRow product={product} key={product.name} />)
            lastCategory = product.category;
        });

        return (<table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>)
    }

}

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }
    handleFilterTextChange(e) {
        this.props.filterTextChange(e.target.value)
    }
    handleInStockOnlyChange(e) {
        this.props.inStockOnlyChange(e.target.checked)
    }
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
        return (<form>
            <input value={filterText} type='text' onChange={this.handleFilterTextChange} placeholder='Search...' />
            <p>
                <input type='checkbox' onChange={this.handleInStockOnlyChange} checked={inStockOnly} />{' '}Only show products in stock
        </p>
        </form>)
    }
}
class FilterProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }
    filterTextChange(e) {
        this.setState({
            filterText: e
        })
    }
    inStockOnlyChange(e) {
        this.setState({ inStockOnly: e })
    }
    render() {
        const filterText = this.state.filterText;
        const inStockOnly = this.state.inStockOnly;
        const products = this.props.products;
        return (<div style={{ padding: '10px', border: '1px solid red' }}>
            <SearchBar filterTextChange={this.filterTextChange.bind(this)} inStockOnlyChange={this.inStockOnlyChange.bind(this)} filterText={filterText} inStockOnly={inStockOnly} />
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>)
    }
}
export default FilterProduct;

import React, { Component } from 'react'
import _ from 'lodash'

class TableBody extends Component {
  renderCell = (item, column) => {
    // render delete button && <Like />
    if (column.content) return column.content(item)
    // else render 4 movie-api-data columns
    return _.get(item, column.path)
  }

  createKey = (item, column) => {
    return item._id + (column.path || column.key)
  }

  render() {
    const { data, columns } = this.props
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TableBody

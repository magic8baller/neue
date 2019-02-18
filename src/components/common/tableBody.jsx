import React, { Component } from 'react'
import _ from 'lodash'

class TableBody extends Component {
  renderCell = (item, column) => {
    // render delete button && <Like />
    if (column.content) return column.content(item)
    // else render 4 movie-api-data columns
    return _.get(item, column.path)
  }

  render() {
    const { data, columns } = this.props
    return (
      <tbody>
        {data.map(item => (
          <tr>
            {columns.map(column => (
              <td>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    )
  }
}

export default TableBody

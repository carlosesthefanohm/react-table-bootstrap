function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactPaginate = _interopDefault(require('react-paginate'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var ReactTableBootstrap = function ReactTableBootstrap(_ref) {
  var pageLength = _ref.pageLength,
      orderDirection = _ref.orderDirection,
      rows = _ref.rows,
      isProcessing = _ref.isProcessing,
      columnOrder = _ref.columnOrder,
      head = _ref.head,
      textFilter = _ref.textFilter,
      tableScroll = _ref.tableScroll,
      filterColumns = _ref.filterColumns;

  var _useReducer = React.useReducer(function (state, action) {
    switch (action.type) {
      case 'CHANGE_PAGE_LENGTH':
        return _extends({}, state, {
          pageLength: action.pageLength
        });

      case 'CHANGE_ORDER_DIRECTION':
        return _extends({}, state, {
          orderDirection: action.orderDirection
        });

      case 'CHANGE_COLUMN_ORDER':
        return _extends({}, state, {
          columnOrder: action.columnOrder
        });

      case 'CHANGE_NUMBER_PAGE':
        return _extends({}, state, {
          numberPage: action.numberPage
        });

      case 'SET_ROWS_RENDER':
        return _extends({}, state, {
          rowsRender: action.rowsRender
        });

      case 'SET_ROWS_RENDER_FULL':
        return _extends({}, state, {
          rowsRenderFull: action.rowsRenderFull
        });

      case 'CHANGE_TEXT_FILTER':
        return _extends({}, state, {
          textFilter: action.textFilter,
          numberPage: 1
        });

      case 'SET_FILTER_COLUMN':
        return _extends({}, state, {
          filterColumns: action.filterColumns
        });

      default:
        return state;
    }
  }, {
    pageLength: pageLength,
    orderDirection: orderDirection,
    columnOrder: columnOrder,
    textFilter: textFilter,
    filterColumns: filterColumns,
    numberPage: 1,
    rowsRenderFull: [],
    rowsRender: []
  }),
      store = _useReducer[0],
      dispatch = _useReducer[1];

  var render = React.useCallback(function () {
    if (head.length && !store.columnOrder) {
      if (head[head.length - 1].length) {
        dispatch({
          type: 'CHANGE_COLUMN_ORDER',
          columnOrder: head[head.length - 1][0].name
        });
        return [];
      }
    }

    var arrRowsRender = [];
    var headParams = {};

    if (head.length) {
      if (head[head.length - 1].length) {
        head[head.length - 1].forEach(function (r) {
          if (r.align || r.render) {
            headParams[r.name] = {};

            if (r.align) {
              headParams[r.name].align = r.align;
            }

            if (r.render) {
              headParams[r.name].render = r.render;
            }
          }
        });
        rows.forEach(function (r) {
          var row = {};
          head[head.length - 1].forEach(function (h) {
            row[h.name] = r[h.name];
          });
          arrRowsRender.push(row);
        });
      }
    }

    return arrRowsRender.filter(function (r) {
      var has = false;

      for (var key in r) {
        if (r[key].toString().toUpperCase().includes(store.textFilter.toUpperCase())) {
          has = true;
          break;
        }
      }

      return has ? r : null;
    }).filter(function (r) {
      var countFind = 0;

      var _loop = function _loop(key) {
        if (store.filterColumns.some(function (f) {
          return f.name === key;
        })) {
          var fc = store.filterColumns.find(function (f) {
            return f.name === key;
          });
          fc.textFilter = fc.textFilter || '';

          if (r[key].toString().toUpperCase().includes(fc.textFilter.toString().toUpperCase())) {
            countFind++;
          }
        }
      };

      for (var key in r) {
        _loop(key);
      }

      return countFind === store.filterColumns.length ? r : null;
    }).sort(function (a, b) {
      if (store.columnOrder) {
        if (store.orderDirection === 'asc') {
          if (a[store.columnOrder] >= b[store.columnOrder]) return 1;else return -1;
        } else {
          if (a[store.columnOrder] <= b[store.columnOrder]) return 1;else return -1;
        }
      }

      return 1;
    }).map(function (rr) {
      var row = [];

      var _loop2 = function _loop2(key) {
        var _headParams$key, _headParams$key2;

        var td = {};

        if ((_headParams$key = headParams[key]) !== null && _headParams$key !== void 0 && _headParams$key.align) {
          td.align = headParams[key].align;
        }

        var fnRender = function fnRender() {
          return rr[key];
        };

        if ((_headParams$key2 = headParams[key]) !== null && _headParams$key2 !== void 0 && _headParams$key2.render) {
          var _headParams$key3;

          fnRender = (_headParams$key3 = headParams[key]) === null || _headParams$key3 === void 0 ? void 0 : _headParams$key3.render;
        }

        row.push( /*#__PURE__*/React__default.createElement("td", td, fnRender(rr)));
      };

      for (var key in rr) {
        _loop2(key);
      }

      return /*#__PURE__*/React__default.createElement("tr", null, React__default.Children.toArray(row));
    });
  }, [rows, head, store.columnOrder, store.orderDirection, store.textFilter, store.filterColumns]);
  var handleChangePageLenght = React.useCallback(function (e) {
    dispatch({
      type: 'CHANGE_PAGE_LENGTH',
      pageLength: parseInt(e.target.value)
    });
    dispatch({
      type: 'CHANGE_NUMBER_PAGE',
      numberPage: 1
    });
  }, []);
  var cboPageLenght = React.useMemo(function () {
    var arrLenghts = [10, 25, 50, 100];
    return /*#__PURE__*/React__default.createElement("select", {
      onChange: handleChangePageLenght,
      value: store.pageLength,
      className: "align-self-center form-control form-control-sm"
    }, React__default.Children.toArray(arrLenghts.map(function (l) {
      return /*#__PURE__*/React__default.createElement("option", {
        value: l
      }, l);
    })));
  }, [handleChangePageLenght, store.pageLength]);
  var changeOrder = React.useCallback(function (e) {
    if (store.columnOrder === e.target.dataset.name) {
      dispatch({
        type: 'CHANGE_ORDER_DIRECTION',
        orderDirection: store.orderDirection === 'asc' ? 'desc' : 'asc'
      });
    } else {
      dispatch({
        type: 'CHANGE_COLUMN_ORDER',
        columnOrder: e.target.dataset.name
      });
    }
  }, [store.columnOrder, store.orderDirection]);
  var changeFilterColumn = React.useCallback(function (e) {
    var name = e.target.dataset.name;
    dispatch({
      type: 'SET_FILTER_COLUMN',
      filterColumns: store.filterColumns.map(function (f) {
        if (f.name === name) {
          f.textFilter = e.target.value;
        }

        return f;
      })
    });
    dispatch({
      type: 'CHANGE_NUMBER_PAGE',
      numberPage: 1
    });
  }, [store.filterColumns]);
  var changeFilterColumnByScape = React.useCallback(function (e) {
    var name = e.target.dataset.name;

    if (e.keyCode === 27) {
      dispatch({
        type: 'SET_FILTER_COLUMN',
        filterColumns: store.filterColumns.map(function (f) {
          if (f.name === name) {
            f.textFilter = '';
          }

          return f;
        })
      });
      dispatch({
        type: 'CHANGE_NUMBER_PAGE',
        numberPage: 1
      });
    }
  }, [store.filterColumns]);
  var getHeader = React.useMemo(function () {
    return /*#__PURE__*/React__default.createElement("thead", null, React__default.Children.toArray(head.map(function (tr, j) {
      return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("tr", null, React__default.Children.toArray(tr.map(function (h) {
        h.sort = h.sort !== false;
        h.colSpan = h.colSpan || 1;
        h.rowSpan = h.rowSpan || 1;
        var d = {};

        if (h.sort) {
          d.className = 'sort icon ' + (store.columnOrder === h.name ? store.orderDirection === 'desc' ? ' active-desc' : ' active-asc' : '');
          d.onClick = changeOrder;
          d['data-name'] = h.name;
        }

        if (h.colSpan > 1) {
          d.colSpan = h.colSpan;
        }

        if (h.rowSpan > 1) {
          d.rowSpan = h.rowSpan;
        }

        return /*#__PURE__*/React__default.createElement("th", _extends({}, d, {
          width: h.width ? h.width : ''
        }), h.text);
      }))), j + 1 === head.length && store.filterColumns.length ? /*#__PURE__*/React__default.createElement("tr", null, React__default.Children.toArray(tr.map(function (h) {
        if (store.filterColumns.some(function (f) {
          return f.name === h.name;
        })) {
          var fc = store.filterColumns.find(function (f) {
            return f.name === h.name;
          });
          fc.textFilter = fc.textFilter ? fc.textFilter : '';
          return /*#__PURE__*/React__default.createElement("th", null, /*#__PURE__*/React__default.createElement("input", {
            placeholder: "Buscar",
            className: "form-control form-control-sm",
            value: fc.textFilter,
            "data-name": h.name,
            onChange: changeFilterColumn,
            onKeyUp: changeFilterColumnByScape
          }));
        } else {
          return /*#__PURE__*/React__default.createElement("th", null);
        }
      }))) : /*#__PURE__*/React__default.createElement("tr", null));
    })));
  }, [head, store.columnOrder, store.orderDirection, changeOrder, store.filterColumns, changeFilterColumn, changeFilterColumnByScape]);
  var getBody = React.useMemo(function () {
    if (isProcessing) {
      return /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", {
        colSpan: head[head.length - 1].length,
        className: "text-center"
      }, "Procesando..."));
    } else {
      if (store.rowsRender.length) {
        return React__default.Children.toArray(store.rowsRender.slice(store.numberPage === 1 ? 0 : (store.numberPage - 1) * store.pageLength, store.pageLength * store.numberPage));
      } else {
        return /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", {
          colSpan: head[head.length - 1].length,
          className: "text-center"
        }, "No hay registros para mostrar."));
      }
    }
  }, [isProcessing, head, store.rowsRender, store.numberPage, store.pageLength]);
  var getLegend = React.useMemo(function () {
    return /*#__PURE__*/React__default.createElement(React.Fragment, null, "Mostrando ", !store.rowsRender.length ? 0 : (store.numberPage - 1) * store.pageLength + 1, " a ", store.rowsRender.slice(store.numberPage === 1 ? 0 : (store.numberPage - 1) * store.pageLength, store.pageLength * store.numberPage).length - store.pageLength === 0 ? store.pageLength * store.numberPage : store.rowsRender.slice(0, store.pageLength * store.numberPage).length, " de ", store.rowsRenderFull.length !== store.rowsRender.length ? store.rowsRender.length + ' filtrados de ' : '', !isProcessing ? rows.length : 0, " registros");
  }, [store.rowsRender, store.numberPage, store.pageLength, store.rowsRenderFull, rows, isProcessing]);
  var changeNumberPage = React.useCallback(function (e) {
    dispatch({
      type: 'CHANGE_NUMBER_PAGE',
      numberPage: parseInt(e.selected + 1)
    });
  }, []);
  var getPaginate = React.useMemo(function () {
    var calculate = Math.floor(store.rowsRender.length / store.pageLength) - store.rowsRender.length / store.pageLength !== 0 ? Math.floor(store.rowsRender.length / store.pageLength) + 1 : store.rowsRender.length / store.pageLength;
    return /*#__PURE__*/React__default.createElement(ReactPaginate, {
      pageRangeDisplayed: 2,
      marginPagesDisplayed: 1,
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      breakLabel: '...',
      pageCount: calculate,
      onPageChange: changeNumberPage,
      containerClassName: 'pagination-react align-self-center',
      previousClassName: '',
      previousLinkClassName: '',
      nextClassName: calculate === 0 ? 'disabled' : '',
      nextLinkClassName: '',
      breakClassName: '',
      breakLinkClassName: '',
      pageLinkClassName: '',
      pageClassName: '',
      forcePage: store.numberPage - 1
    });
  }, [store.rowsRender, store.pageLength, changeNumberPage, store.numberPage]);
  React.useEffect(function () {
    return dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter: textFilter
    });
  }, [textFilter]);
  React.useEffect(function () {
    return dispatch({
      type: 'CHANGE_ORDER_DIRECTION',
      orderDirection: orderDirection
    });
  }, [orderDirection]);
  React.useEffect(function () {
    return dispatch({
      type: 'CHANGE_PAGE_LENGTH',
      pageLength: pageLength
    });
  }, [pageLength]);
  React.useEffect(function () {
    if (isProcessing) {
      dispatch({
        type: 'SET_ROWS_RENDER',
        rowsRender: []
      });
      dispatch({
        type: 'SET_ROWS_RENDER_FULL',
        rowsRenderFull: []
      });
      dispatch({
        type: 'CHANGE_NUMBER_PAGE',
        numberPage: 1
      });
    } else {
      dispatch({
        type: 'SET_ROWS_RENDER',
        rowsRender: render()
      });
      dispatch({
        type: 'SET_ROWS_RENDER_FULL',
        rowsRenderFull: rows
      });
    }
  }, [isProcessing, render, rows, head]);
  React.useEffect(function () {
    if (!isProcessing) {
      dispatch({
        type: 'SET_ROWS_RENDER',
        rowsRender: render()
      });
    }
  }, [store.textFilter, store.columnOrder, store.filterColumns, store.orderDirection, render, rows, head, isProcessing]);

  var filterBy = function filterBy(e) {
    return dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter: e.keyCode === 27 ? '' : e.target.value
    });
  };

  var fileyByScape = function fileyByScape(e) {
    return dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter: e.target.value
    });
  };

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex flex-column flex-md-row justify-content-between mb-2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "align-self-center mr-2"
  }, "Mostrar"), cboPageLenght)), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-center mt-2 mt-md-0"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "align-self-center mr-2"
  }, "Buscar"), /*#__PURE__*/React__default.createElement("input", {
    onKeyUp: filterBy,
    onChange: fileyByScape,
    value: store.textFilter ? store.textFilter : '',
    className: "align-self-center form-control form-control-sm",
    placeholder: "Buscar"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/React__default.createElement("table", {
    className: 'dt-react table table-sm table-hover table-striped table-bordered ' + (tableScroll ? 'table-scroll' : '')
  }, getHeader, /*#__PURE__*/React__default.createElement("tbody", null, getBody))), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex flex-column flex-md-row justify-content-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "align-self-center"
  }, getLegend), getPaginate));
};

ReactTableBootstrap.defaultProps = {
  rows: [],
  head: [],
  isProcessing: false,
  columnOrder: '',
  orderDirection: 'asc',
  pageLength: 10,
  textFilter: '',
  tableScroll: false,
  filterColumns: []
};

module.exports = ReactTableBootstrap;
//# sourceMappingURL=index.js.map

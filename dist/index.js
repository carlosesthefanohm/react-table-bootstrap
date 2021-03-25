this.index = this.index || {};
this.index.js = (function (React, ReactPaginate, PropTypes) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactPaginate__default = /*#__PURE__*/_interopDefaultLegacy(ReactPaginate);
  var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

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

  const ReactTableBootstrap = ({
    pageLength,
    orderDirection,
    rows,
    isProcessing,
    columnOrder,
    head,
    textFilter,
    tableScroll,
    filterColumns
  }) => {
    //
    // ─── ESTADOS CON REDUCER ────────────────────────────────────────────────────────
    //
    const [store, dispatch] = React.useReducer((state, action) => {
      switch (action.type) {
        case 'CHANGE_PAGE_LENGTH':
          return { ...state,
            pageLength: action.pageLength
          };

        case 'CHANGE_ORDER_DIRECTION':
          return { ...state,
            orderDirection: action.orderDirection
          };

        case 'CHANGE_COLUMN_ORDER':
          return { ...state,
            columnOrder: action.columnOrder
          };

        case 'CHANGE_NUMBER_PAGE':
          return { ...state,
            numberPage: action.numberPage
          };

        case 'SET_ROWS_RENDER':
          return { ...state,
            rowsRender: action.rowsRender
          };

        case 'SET_ROWS_RENDER_FULL':
          return { ...state,
            rowsRenderFull: action.rowsRenderFull
          };

        case 'CHANGE_TEXT_FILTER':
          return { ...state,
            textFilter: action.textFilter,
            numberPage: 1
          };

        case 'SET_FILTER_COLUMN':
          return { ...state,
            filterColumns: action.filterColumns
          };

        default:
          return state;
      }
    }, {
      pageLength,
      orderDirection,
      columnOrder,
      textFilter,
      filterColumns,
      numberPage: 1,
      rowsRenderFull: [],
      rowsRender: []
    });
    const render = React.useCallback(() => {
      if (head.length && !store.columnOrder) {
        if (head[head.length - 1].length) {
          dispatch({
            type: 'CHANGE_COLUMN_ORDER',
            columnOrder: head[head.length - 1][0].name
          });
          return [];
        }
      }

      let arrRowsRender = [];
      let headParams = {};

      if (head.length) {
        if (head[head.length - 1].length) {
          head[head.length - 1].forEach(r => {
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
          rows.forEach(r => {
            let row = {};
            head[head.length - 1].forEach(h => {
              row[h.name] = r[h.name];
            });
            arrRowsRender.push(row);
          });
        }
      }

      return arrRowsRender.filter(r => {
        let has = false;

        for (const key in r) {
          if (r[key].toString().toUpperCase().includes(store.textFilter.toUpperCase())) {
            has = true;
            break;
          }
        }

        return has ? r : null;
      }).filter(r => {
        let countFind = 0;

        for (const key in r) {
          if (store.filterColumns.some(f => f.name === key)) {
            let fc = store.filterColumns.find(f => f.name === key);
            fc.textFilter = fc.textFilter || '';

            if (r[key].toString().toUpperCase().includes(fc.textFilter.toString().toUpperCase())) {
              countFind++;
            }
          }
        }

        return countFind === store.filterColumns.length ? r : null;
      }).sort((a, b) => {
        if (store.columnOrder) {
          if (store.orderDirection === 'asc') {
            if (a[store.columnOrder] >= b[store.columnOrder]) return 1;else return -1;
          } else {
            if (a[store.columnOrder] <= b[store.columnOrder]) return 1;else return -1;
          }
        }

        return 1;
      }).map(rr => {
        let row = [];

        for (const key in rr) {
          let td = {};

          if (headParams[key]?.align) {
            td.align = headParams[key].align;
          }

          let fnRender = () => rr[key];

          if (headParams[key]?.render) {
            fnRender = headParams[key]?.render;
          }

          row.push( /*#__PURE__*/React__default['default'].createElement("td", td, fnRender(rr)));
        }

        return /*#__PURE__*/React__default['default'].createElement("tr", null, React__default['default'].Children.toArray(row));
      });
    }, [rows, head, store.columnOrder, store.orderDirection, store.textFilter, store.filterColumns]); //
    // ─── ESTADOS CALLBACK ───────────────────────────────────────────────────────────
    //
    // Número de items por página

    const handleChangePageLenght = React.useCallback(e => {
      dispatch({
        type: 'CHANGE_PAGE_LENGTH',
        pageLength: parseInt(e.target.value)
      });
      dispatch({
        type: 'CHANGE_NUMBER_PAGE',
        numberPage: 1
      });
    }, []); // Select con la lista de item por página

    const cboPageLenght = React.useMemo(() => {
      let arrLenghts = [10, 25, 50, 100];
      return /*#__PURE__*/React__default['default'].createElement("select", {
        onChange: handleChangePageLenght,
        value: store.pageLength,
        className: "align-self-center form-control form-control-sm"
      }, React__default['default'].Children.toArray(arrLenghts.map(l => {
        return /*#__PURE__*/React__default['default'].createElement("option", {
          value: l
        }, l);
      })));
    }, [handleChangePageLenght, store.pageLength]); // Cambiar dirección de columna y número de columna por la cual se ordena

    const changeOrder = React.useCallback(e => {
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
    const changeFilterColumn = React.useCallback(e => {
      const {
        name
      } = e.target.dataset;
      dispatch({
        type: 'SET_FILTER_COLUMN',
        filterColumns: store.filterColumns.map(f => {
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
    const changeFilterColumnByScape = React.useCallback(e => {
      const {
        name
      } = e.target.dataset;

      if (e.keyCode === 27) {
        dispatch({
          type: 'SET_FILTER_COLUMN',
          filterColumns: store.filterColumns.map(f => {
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
    }, [store.filterColumns]); // Cabecera de la tabla

    const getHeader = React.useMemo(() => {
      return /*#__PURE__*/React__default['default'].createElement("thead", null, React__default['default'].Children.toArray(head.map((tr, j) => {
        return /*#__PURE__*/React__default['default'].createElement(React.Fragment, null, /*#__PURE__*/React__default['default'].createElement("tr", null, React__default['default'].Children.toArray(tr.map(h => {
          h.sort = h.sort !== false;
          h.colSpan = h.colSpan || 1;
          h.rowSpan = h.rowSpan || 1;
          let d = {};

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

          return /*#__PURE__*/React__default['default'].createElement("th", _extends({}, d, {
            width: h.width ? h.width : ''
          }), h.text);
        }))), j + 1 === head.length && store.filterColumns.length ? /*#__PURE__*/React__default['default'].createElement("tr", null, React__default['default'].Children.toArray(tr.map(h => {
          if (store.filterColumns.some(f => {
            return f.name === h.name;
          })) {
            let fc = store.filterColumns.find(f => {
              return f.name === h.name;
            });
            fc.textFilter = fc.textFilter ? fc.textFilter : '';
            return /*#__PURE__*/React__default['default'].createElement("th", null, /*#__PURE__*/React__default['default'].createElement("input", {
              placeholder: "Buscar",
              className: "form-control form-control-sm",
              value: fc.textFilter,
              "data-name": h.name,
              onChange: changeFilterColumn,
              onKeyUp: changeFilterColumnByScape
            }));
          } else {
            return /*#__PURE__*/React__default['default'].createElement("th", null);
          }
        }))) : /*#__PURE__*/React__default['default'].createElement("tr", null));
      })));
    }, [head, store.columnOrder, store.orderDirection, changeOrder, store.filterColumns, changeFilterColumn, changeFilterColumnByScape]); // Mostrar el listado de registros en la tabla

    const getBody = React.useMemo(() => {
      if (isProcessing) {
        return /*#__PURE__*/React__default['default'].createElement("tr", null, /*#__PURE__*/React__default['default'].createElement("td", {
          colSpan: head[head.length - 1].length,
          className: "text-center"
        }, "Procesando..."));
      } else {
        if (store.rowsRender.length) {
          return React__default['default'].Children.toArray(store.rowsRender.slice(store.numberPage === 1 ? 0 : (store.numberPage - 1) * store.pageLength, store.pageLength * store.numberPage));
        } else {
          return /*#__PURE__*/React__default['default'].createElement("tr", null, /*#__PURE__*/React__default['default'].createElement("td", {
            colSpan: head[head.length - 1].length,
            className: "text-center"
          }, "No hay registros para mostrar."));
        }
      }
    }, [isProcessing, head, store.rowsRender, store.numberPage, store.pageLength]); // Mostrar leyenda de cantidad de resultados

    const getLegend = React.useMemo(() => {
      return /*#__PURE__*/React__default['default'].createElement(React.Fragment, null, "Mostrando ", !store.rowsRender.length ? 0 : (store.numberPage - 1) * store.pageLength + 1, " a ", store.rowsRender.slice(store.numberPage === 1 ? 0 : (store.numberPage - 1) * store.pageLength, store.pageLength * store.numberPage).length - store.pageLength === 0 ? store.pageLength * store.numberPage : store.rowsRender.slice(0, store.pageLength * store.numberPage).length, " de ", store.rowsRenderFull.length !== store.rowsRender.length ? store.rowsRender.length + ' filtrados de ' : '', !isProcessing ? rows.length : 0, " registros");
    }, [store.rowsRender, store.numberPage, store.pageLength, store.rowsRenderFull, rows, isProcessing]); // Cambiar número de página

    const changeNumberPage = React.useCallback(e => {
      dispatch({
        type: 'CHANGE_NUMBER_PAGE',
        numberPage: parseInt(e.selected + 1)
      });
    }, []); // Mostrar Paginación

    const getPaginate = React.useMemo(() => {
      let calculate = Math.floor(store.rowsRender.length / store.pageLength) - store.rowsRender.length / store.pageLength !== 0 ? Math.floor(store.rowsRender.length / store.pageLength) + 1 : store.rowsRender.length / store.pageLength;
      return /*#__PURE__*/React__default['default'].createElement(ReactPaginate__default['default'], {
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
    }, [store.rowsRender, store.pageLength, changeNumberPage, store.numberPage]); //
    // ─── EFECTOS ────────────────────────────────────────────────────────────────────
    //

    React.useEffect(() => dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter
    }), [textFilter]);
    React.useEffect(() => dispatch({
      type: 'CHANGE_ORDER_DIRECTION',
      orderDirection: orderDirection
    }), [orderDirection]);
    React.useEffect(() => dispatch({
      type: 'CHANGE_PAGE_LENGTH',
      pageLength
    }), [pageLength]);
    React.useEffect(() => {
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
    React.useEffect(() => {
      if (!isProcessing) {
        dispatch({
          type: 'SET_ROWS_RENDER',
          rowsRender: render()
        });
      }
    }, [store.textFilter, store.columnOrder, store.filterColumns, store.orderDirection, render, rows, head, isProcessing]); //
    // ─── FUNCIONES CREADAS ──────────────────────────────────────────────────────────
    //

    const filterBy = e => dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter: e.keyCode === 27 ? '' : e.target.value
    });

    const fileyByScape = e => dispatch({
      type: 'CHANGE_TEXT_FILTER',
      textFilter: e.target.value
    });

    return /*#__PURE__*/React__default['default'].createElement(React.Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex flex-column flex-md-row justify-content-between mb-2"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "align-self-center mr-2"
    }, "Mostrar"), cboPageLenght)), /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex justify-content-center mt-2 mt-md-0"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/React__default['default'].createElement("span", {
      className: "align-self-center mr-2"
    }, "Buscar"), /*#__PURE__*/React__default['default'].createElement("input", {
      onKeyUp: filterBy,
      onChange: fileyByScape,
      value: store.textFilter ? store.textFilter : '',
      className: "align-self-center form-control form-control-sm",
      placeholder: "Buscar"
    })))), /*#__PURE__*/React__default['default'].createElement("div", {
      className: "table-responsive"
    }, /*#__PURE__*/React__default['default'].createElement("table", {
      className: 'dt-react table table-sm table-hover table-striped table-bordered ' + (tableScroll ? 'table-scroll' : '')
    }, getHeader, /*#__PURE__*/React__default['default'].createElement("tbody", null, getBody))), /*#__PURE__*/React__default['default'].createElement("div", {
      className: "d-flex flex-column flex-md-row justify-content-between"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
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
  ReactTableBootstrap.propTypes = {
    rows: PropTypes__default['default'].array,
    head: PropTypes__default['default'].array.isRequired,
    isProcessing: PropTypes__default['default'].bool,
    columnOrder: PropTypes__default['default'].string,
    orderDirection: PropTypes__default['default'].oneOf(['asc', 'desc']),
    pageLength: PropTypes__default['default'].oneOf([10, 25, 50, 100, -1]),
    textFilter: PropTypes__default['default'].string,
    tableScroll: PropTypes__default['default'].bool,
    filterColumns: PropTypes__default['default'].array
  };

  return ReactTableBootstrap;

}(React, ReactPaginate, PropTypes));
//# sourceMappingURL=index.js.map

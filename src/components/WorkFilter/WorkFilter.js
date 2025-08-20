import React, { useContext, useState, useEffect } from 'react'
import { LayoutContext } from 'containers/Layout/Layout'
import { ApiDataCtx } from 'containers/App/App'
import emmitter from 'tiny-emitter/instance'

import './WorkFilter.scss'

const WorkFilters = () => {
  const { filters, setFilters } = useContext(LayoutContext)
  const { contextCaseStudies } = useContext(ApiDataCtx)

  const getCount = (key) => {
    let count = 0
    contextCaseStudies.forEach((element) => {
      if (element.tags.includes(key)) {
        count++
      }
    })
    return count
  }

  const tags = [
    {
      title: 'Strategy',
      count: getCount('strategy'),
    },
    {
      title: 'Branding',
      count: getCount('branding'),
    },
    {
      title: 'Digital',
      count: getCount('digital'),
    },
    {
      title: 'Content',
      count: getCount('content'),
    },
    {
      title: 'Environment',
      count: getCount('environment'),
    },
    {
      title: 'Sustainability',
      count: getCount('sustainability'),
    },
    {
      title: 'Outdoor',
      count: getCount('outdoor'),
    },
    {
      title: 'Transportation',
      count: getCount('transportation'),
    },
    {
      title: 'Hospitality',
      count: getCount('hospitality'),
    },
    {
      title: 'Culture',
      count: getCount('culture'),
    },
  ]

  const closeFilters = () => {
    setFilters({
      ...filters,
      active: false,
    })
    emmitter.emit('filter:hide')
  }

  const resetFilters = () => {
    setFilters({
      ...filters,
      tag: 'all',
    })

    emmitter.emit('filter:change', { key: 'all' })
  }

  const selectTag = (index) => {
    const tag = tags[index]
    const key = tag.title.toLowerCase()
    if (filters.tag === key) {
      resetFilters()
    } else {
      emmitter.emit('filter:change', { key })
      setFilters({
        ...filters,
        tag: key,
      })
    }
  }

  return (
    <div className="work-filters-outer">
      <div
        className="work-filters-background"
        onClick={() => closeFilters()}
      ></div>
      <div className="work-filters">
        <button className="work-filters__close" onClick={() => closeFilters()}>
          CLOSE
        </button>
        <div className="work-filters__content">
          <div className="work-filters__categories">
            {tags.slice(0, 5).map((item, index) => {
              return (
                <div
                  key={'workcat' + index}
                  onClick={() => {
                    selectTag(index)
                  }}
                  className={`work-filters__category work-filters__filter ${
                    item.title.toLowerCase() === filters.tag ||
                    filters.tag === 'all'
                      ? 'active'
                      : ''
                  }`}
                >
                  <div>
                    {item.title}
                    <span>_{item.count}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="work-filters__seperator">_</div>
          <div className="work-filters__tags">
            {tags.slice(5, tags.length).map((item, index) => {
              return (
                <div
                  key={'worktag' + index}
                  onClick={() => {
                    selectTag(5 + index)
                  }}
                  className={`work-filters__tag work-filters__filter ${
                    item.title.toLowerCase() === filters.tag ||
                    filters.tag === 'all'
                      ? 'active'
                      : ''
                  }`}
                >
                  <div>
                    {item.title}
                    <span>_{item.count}</span>
                  </div>
                </div>
              )
            })}
            <div
              onClick={() => {
                resetFilters()
              }}
              className={`work-filters__tag work-filters__filter active`}
            >
              All
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkFilters

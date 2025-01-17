// Copyright 2022 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Dropdown, IDropdownOption } from '@fluentui/react';
import React from 'react';
import { S } from './core';
import { selectedsOf } from './options';
import { BoxProps, make } from './ui';

export const Droplist = make(({ context, box }: BoxProps) => {
  const
    { index, text, placeholder, error, required, options } = box,
    selecteds = selectedsOf(box),
    selection = new Set<S>(selecteds.map(s => String(s.value))),
    items: IDropdownOption[] = options.map(c => ({ key: c.value, text: String(c.text) })),
    selectedKeys = selecteds.map(c => String(c.value)),
    capture = () => context.capture(index, Array.from(selection)),
    onChange = (_?: React.FormEvent<HTMLElement>, option?: IDropdownOption) => {
      if (option) {
        const key = String(option.key)
        if (option.selected) {
          selection.add(key)
        } else {
          selection.delete(key)
        }
        capture()
      }
    },
    render = () => {
      return (
        <Dropdown
          multiSelect
          label={text}
          placeholder={placeholder}
          options={items}
          defaultSelectedKeys={selectedKeys}
          errorMessage={error}
          required={required ? true : false}
          onChange={onChange}
        />
      )
    }

  capture()

  return { render }
})

import * as S from './style';
import iconCalendar from '../../assets/icon-calendar.svg';
import Logo from '../../assets/logo.svg';
import iconUpDisabled from '../../assets/icon-up-gray.svg';
import iconUpActived from '../../assets/icon-up-green.svg';
import iconDownDisabled from '../../assets/icon-down-gray.svg';
import iconDownActived from '../../assets/icon-down-red.svg';
import iconPlus from '../../assets/icon-plus.svg';
import WeekPicker from "../WeekPicker"
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function NotodoPage() {
  // 임시 데이터 ^0^

  const data = [
    {
      id: 1,
      content: "노래부르기",
      status: {
        successed: false,
        failed: false
      },
    },
    {
      id: 2,
      content: "노래부르기",
      status: {
        successed: true,
        failed: false
      },
    },
    {
      id: 3,
      content: "노래부르기",
      status: {
        successed: true,
        failed: false
      },
    },
    {
      id: 4,
      content: "말하기",
      status: {
        successed: false,
        failed: true
      },
    },
  ]

  const [notodoList, setNotodoList] = useState(data)
  const [inputValue, setInputValue] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [notodoList])

  useEffect(() => {
    getInputWidth()
  }, [inputValue])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const getInputWidth = useCallback(() => {
    if (!inputRef.current) {
      return
    }
    const inputValue = inputRef.current.value || ''
    const inputWidth = getTextWidth(inputValue, inputRef.current.style.font)
    inputRef.current.style.width = `${inputWidth}px`
  }, [])

  function getTextWidth(text, font) {
    const span = document.createElement("span")
    span.style.font = font
    span.style.visibility = "hidden"
    span.style.position = "absolute"
    span.style.padding = "0px"
    span.style.boxSizing = "border-box"
    span.innerText = text
    document.body.appendChild(span)
    const width = span.offsetWidth
    document.body.removeChild(span)
    return width * 0.87
  }

  const handleInputBlur = () => {
    if (inputValue.trim() !== "") {
      const data = [{
        id: Date.now(),
        content: inputValue,
        status: {
          successed: false,
          failed: false,
        }
      }, ...notodoList.slice(1,)
      ]
      setNotodoList(data)
      setInputValue("")
      setIsAdding(false)
    }
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleInputBlur()
    }
  }

  const handleAddButtonClick = () => {
    if (!isAdding) {
      setIsAdding(true)
      const newItem = {
        id: Date.now(),
        content: inputValue,
        status: {
          successed: false,
          failed: false,
        },
      }
      setNotodoList([newItem, ...notodoList])
      inputRef?.current?.focus()
    }
  }

  const handleItemClick = (id, type) => {
    const newData = notodoList.map(item => {
      if (item.id === id && !isAdding) {
        if (type === "successed") {
          return {
            ...item,
            status: {
              successed: !item.status.successed,
              failed: false,
            },
          }
        } else {
          return {
            ...item,
            status: {
              successed: false,
              failed: !item.status.failed,
            },
          }
        }
      }
      return item
    })
    setNotodoList(newData)
  }

  return (
    <S.Div>
      <S.Header>
        <div>
          <button onClick={() => navigate('/calender')}><S.CalImg src={iconCalendar} /></button>
          <S.Logo src={Logo} />
        </div>
        <WeekPicker />
      </S.Header>
      <S.NotodoWrap>
        {
          notodoList.map(i => (
            <S.NotodoLi key={i.id}>
              <S.ContentWrap>
                {i.content === "" ? (
                  <>
                    <input type="text" value={inputValue} autoFocus onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleInputKeyDown} ref={inputRef} />
                  </>
                ) :
                  <p>{i.content}</p>}
                <p>금지</p>
              </S.ContentWrap>
              <button onClick={() => handleItemClick(i.id, "successed")} ><img src={i.status.successed ? iconUpActived : iconUpDisabled} /></button>
              <button onClick={() => handleItemClick(i.id, "failed")}><img src={i.status.failed ? iconDownActived : iconDownDisabled} /></button>
            </S.NotodoLi>
          ))
        }
      </S.NotodoWrap>
      <S.Footer>
        <S.ResultWrap>
          <span>{notodoList.length}</span>
          <span>{notodoList.filter(i => i.status.successed).length}</span>
          <span>{notodoList.filter(i => i.status.failed).length}</span>
        </S.ResultWrap>
        <S.AddBtn onClick={handleAddButtonClick}><img src={iconPlus} /></S.AddBtn>
      </S.Footer>
    </S.Div>
  )
}

export default NotodoPage;
import {
  Box,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { updateReservationPersonInfo } from '@store/makeReservationSlice'
import { openModal } from '@store/displayModalWindowSlice'
import { useState, useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import style from './TravellerInfoForm.module.scss'

const TravellerInfoForm = ({ number }) => {
  const index = number - 1

  const dispatch = useDispatch()

  const [duplicateClientInfo, setDuplicateClientInfo] = useState(false)

  const updateDuplicateClientInfoState = () => {
    setDuplicateClientInfo(!duplicateClientInfo)
  }

  const bookingClientInfo = useSelector((state) => {
    return state.bookingClientInfo
  })

  const { name, phoneNumber } = bookingClientInfo

  const makeReservation = useSelector((state) => {
    return state.makeReservation
  })

  const { reservationPersonListDto } = makeReservation

  const getClientInfo = (duplicateClientInfo) => {
    if (duplicateClientInfo) {
      if (name === '' || phoneNumber === '') {
        setDuplicateClientInfo(false)
        dispatch(openModal())
      } else {
        dispatch(
          updateReservationPersonInfo({
            name: name,
            phoneNumber: phoneNumber,
            index: index,
          }),
        )
      }
    } else {
      if (name === '' || phoneNumber === '') {
        return
      } else {
        dispatch(
          updateReservationPersonInfo({
            name: '',
            phoneNumber: '',
            index: index,
          }),
        )
      }
    }
  }

  useEffect(() => {
    getClientInfo(duplicateClientInfo)
  }, [duplicateClientInfo])

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    dispatch(updateReservationPersonInfo({ [name]: value, index: index }))
  }

  const removeInputSpaces = (e) => {
    const { name, value } = e.target
    dispatch(
      updateReservationPersonInfo({
        [name]: value.trim().replace(/\s/g, ''),
        index: index,
      }),
    )
  }

  return (
    <Accordion
      defaultExpanded={true}
      disableGutters={true}
      sx={{
        marginTop: '2rem',
        boxShadow: 'unset',
        border: '1px solid #ddd',
        borderRadius: '5px',
        '&::before': {
          height: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        sx={{ backgroundColor: '#F2F4FA', marginBottom: '0' }}
      >
        <Typography>여행자 정보 {number}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '1.6rem' }}>
        <Box>
          <Box
            sx={{
              display: number === 1 ? 'flex' : 'none',
              justifyContent: 'flex-end',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={duplicateClientInfo}
                  onChange={updateDuplicateClientInfoState}
                />
              }
              label="예약자 정보와 동일"
              sx={{
                margin: '0 0 1rem 0',
                '& .MuiButtonBase-root': {
                  padding: '0 0.5rem 0 0',
                },
              }}
            />
          </Box>
          <div className={style['input-wrapper']}>
            <div className={style['label']}>이름</div>
            <TextField
              name="name"
              size="small"
              placeholder="이름을 입력해주세요"
              value={reservationPersonListDto[number - 1].name}
              onChange={inputChangeHandler}
              onBlur={removeInputSpaces}
              sx={{ width: '100%' }}
            />
          </div>
          <div className={style['input-wrapper']}>
            <div className={style['label']}>전화번호</div>
            <TextField
              name="phoneNumber"
              size="small"
              placeholder="전화번호 11자리를 입력해주세요"
              value={reservationPersonListDto[number - 1].phoneNumber}
              onChange={inputChangeHandler}
              onBlur={removeInputSpaces}
              sx={{ width: '100%' }}
            />
          </div>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default TravellerInfoForm

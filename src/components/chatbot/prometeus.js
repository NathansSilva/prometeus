import React, { useState } from 'react';
import styles from './styles.css';
import { Buffer } from 'buffer';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Tooltip from '@mui/material/Tooltip';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import Avatar from '@mui/material/Avatar';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Button } from '@mui/material';
import IconChatBot from '../../img/chatbot.png';

export default function Prometeus() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState('');
  const [resposta, setResposta] = useState('Olá, eu sou o Deucalion. 🥰');
  const { speak } = useSpeechSynthesis();
  const [teste, setTeste] = useState();
  const [msgTela, setMsgTela] = useState();

  const key = 'Epc6Lgt1OY5_UVzDhn5_LNyYYbPt0u4B9pu8nGSEKW2E';
  const encodedString = Buffer.from(`apikey:${key}`).toString('base64');

  const enviarTextoParaChatbot = () => {
    axios
      .post(
        `https://api.us-south.assistant.watson.cloud.ibm.com/instances/2ac552ee-0c07-4985-bc8c-1c1886311059/v1/workspaces/c8b14474-3b9c-4579-aa3d-93f605dfe8e1/message?version=2018-09-20`,
        { input: { text: transcript ? transcript : texto } },
        {
          headers: {
            Authorization: `Basic ${encodedString}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        let resp = res.data.output.text;
        setResposta(resp);
        speak({ text: resp });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commands = [
    {
      command: 'limpar tela',
      callback: ({ resetTranscript }) => {
        resetTranscript();
        setResposta('');
      },
    },
    {
      command: 'criar *',
      callback: (site) => {
        history.push('/cadastroTarefa');
        resetTranscript();
      },
    },
    {
      command: 'ver *',
      callback: (site) => {
        history.push('/tarefas');
        resetTranscript();
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const ouvir = () => {
    !teste
      ? SpeechRecognition.startListening()
      : SpeechRecognition.stopListening();
    setTeste((teste) => !teste);
  };

  const enviarMsg = () => {
    setMsgTela(transcript ? transcript : texto);
    enviarTextoParaChatbot();
  };

  return (
    <>
      {!open ? (
        <Button
          sx={{ position: 'fixed', right: '5%', bottom: '25px' }}
          onClick={() => setOpen((open) => !open)}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', padding: '30px' }}>
            <ChatBubbleIcon fontSize="large" />
          </Avatar>
        </Button>
      ) : (
        <div className="chatContainer">
          {/* header */}
          <div className="header">
            <Button onClick={() => setOpen((open) => !open)}>
              <KeyboardArrowDownIcon />
            </Button>
            <h4>Deucalion </h4>
          </div>
          {/* message */}
          <div className="chatConteudo">
            <div className="chatbot">
              <Tooltip title="Deucalion" sx={{ marginRight: '10px' }}>
                <Avatar alt="Deucalion" src={IconChatBot} />
              </Tooltip>
              <div className="resposta">
                <p id="h1-text">
                  {resposta.length !== 0
                    ? resposta
                    : 'Não entendi,Tente reformular a frase para que eu possa compreender'}
                </p>
              </div>
            </div>

            <div className="question">
              <p>{msgTela ? msgTela : '...'}</p>
            </div>
          </div>

          {/* botoes */}
          <div className="containerSend">
            {transcript ? (
              <input value={transcript} onChange={resetTranscript} />
            ) : (
              <input onChange={(e) => setTexto(e.target.value)} value={texto} />
            )}

            {listening ? (
              <button className="btn btn-red" onClick={ouvir}>
                <MicIcon fontSize="small" />
              </button>
            ) : (
              <button className="btn" onClick={ouvir}>
                <MicIcon fontSize="small" />
              </button>
            )}

            <button
              className="btn"
              onClick={() => {
                enviarMsg();
              }}
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

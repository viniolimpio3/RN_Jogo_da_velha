import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import styles from './styles';

export default function App() {
  const [quadro, setQuadro] = useState(Array(9).fill(''));
  const [jogadorAtual, setJogadorAtual] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [ganhador, setGanhador] = useState('');

  const combinacoesPossiveis = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6] // diagonais
  ];

  const verificaVencedor = (novoQuadro) => {
    for (let combinacao of combinacoesPossiveis) {
      const [a, b, c] = combinacao;
      if (novoQuadro[a] && novoQuadro[a] === novoQuadro[b] && novoQuadro[a] === novoQuadro[c]) {
        setGanhador(novoQuadro[a]);
        setGameOver(true);
        return;
      }
    }
  }

  const controlaCliqueBoard = (index) => {
    if(gameOver) return;
    if(quadro[index] !== '') {
      Alert.alert('Jogada inválida', 'Esta posição já está ocupada.');
      return;
    }
    const novoQuadro = [...quadro];
    novoQuadro[index] = jogadorAtual;
    setQuadro(novoQuadro);
    verificaVencedor(novoQuadro);
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Text style={styles.playerText}>
        {gameOver 
          ? ganhador ? `Jogador ${ganhador} ganhou!` : 'Empate!' 
          : `Vez do jogador: ${jogadorAtual}`
        }
      </Text>
      
      <View style={styles.board}>
        {Array.from({ length: 9 }).map((_, index) => ( // Cria um array de 9 elementos
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => controlaCliqueBoard(index)}
          >
            <Text style={styles.squareText}>{quadro[index]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
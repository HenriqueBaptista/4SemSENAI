import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { IoIosAddCircle } from "react-icons/io";

import { v4 as uuidv4 } from 'uuid';
import Resizer from 'react-image-file-resizer'; // Importa a biblioteca de redimensionamento

const PublicationForm = ({
  idUsuario
}) => {
  // CONSTS
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Estado para a pré-visualização da imagem
  const handleOpen = () => setIsOpen(true);



  //FUNCTIONS
  // função para fechar o modal
  const handleClose = () => {
    setIsOpen(false);
    setCaption('');
    setImage(null);
    setImagePreview(null); // Reseta a pré-visualização ao fechar o modal
  };

  // função para lidar com a mudança de imagem, agora com redimensionamento
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtém o primeiro arquivo selecionado
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;

        // Define limites diferentes dependendo da orientação da imagem
        let maxWidth, maxHeight;

        if (naturalWidth > naturalHeight) {
          // Paisagem
          maxWidth = 1280;  // largura máxima
          maxHeight = 960;   // altura máxima
        } else {
          // Retrato
          maxWidth = 960;   // largura máxima
          maxHeight = 1280; // altura máxima
        }

        // Redimensiona a imagem antes de convertê-la em Base64
        Resizer.imageFileResizer(
          file,
          maxWidth, // largura máxima
          maxHeight, // altura máxima
          'JPEG', // formato
          100, // qualidade (0-100), aumentei para 100
          0, // rotação
          (uri) => {
            setImage(uri); // Armazena a imagem em formato Base64
            setImagePreview(URL.createObjectURL(file)); // Atualiza a visualização da imagem
          },
          'base64' // tipo de saída
        );
      };
    } else {
      setImagePreview(null); // Se não houver arquivo, limpa a pré-visualização
    }
  };

  // função para postar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image === null && caption === "") {
      return alert("Você precisa enviar pelo menos uma mensagem ou uma imagem!");
    }

    // procura o usuário pelo id
    await fetch(`http://localhost:3000/usuario?id=${idUsuario}`)
      .then(response => response.json())
      .then(async response => {
        // Gera o objeto da publicação, com ou sem imagem
        const publicationData = {
          id: uuidv4(), // Gera um UUID para o ID
          caption: caption,
          // Se houver imagem, usa o Base64, caso contrário, null
          createdAt: new Date().toISOString(), // Adiciona a data atual
          nome: response[0].nome,
          userId: response[0].id,
          username: response[0].login,
          userImage: response[0].imagem,
          image: image ? image : null
        };

        // Envia os dados da publicação ao JSON Server
        await fetch('http://localhost:3000/publicacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(publicationData),
        });
        console.log(publicationData);

        console.log('Publicação salva com sucesso!');

        handleClose();
      })
      .catch(() => {
        throw new Error('Erro ao salvar publicação');
      });
  };



  // EFFECTS
  useEffect(() => { }, [isOpen])



  return (
    <>
      <button
        className=" fixed md:bottom-[38px] bottom-[9%] right-4 md:right-20 font-bold py-2 px-2 z-50"
        onClick={handleOpen}
      >
        <IoIosAddCircle color='#55AAF9' className='md:w-[80px] md:h-[80px] w-[70px] h-[70px]' />
      </button>

      {/* Usando o componente Modal */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 md:p-12">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Digite uma legenda..."
            className="border-2 border-primary-white bg-primary-black rounded-lg w-full md:w-[650px] h-[120px] px-6 md:px-6 mb-4 mt-6 text-[12px] text-center text-primary-white"
          />

          {/* Input de imagem e pré-visualização */}
          <div className="relative w-full md:w-[650px] h-[180px] md:h-[220px] mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Pré-visualização da imagem"
                className="w-full h-full object-cover rounded-xl"
                onClick={() => document.getElementById('imageInput').click()} // Permite trocar a imagem clicando na pré-visualização
              />
            ) : (
              <label
                htmlFor="imageInput"
                className="border-2 border-dotted border-primary-white h-full w-full flex items-center justify-center rounded-xl text-primary-white text-xs bg-primary-black cursor-pointer md:text-[10px] p-6"
              >
                Clique para selecionar uma imagem (opcional)
              </label>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <button
            className="bg-primary-white text-primary-black w-full md:w-[40%] px-4 py-1 rounded-lg uppercase font-thin mt-16"
            type="submit"
          >
            Publicar
          </button>
        </form>
      </Modal>
    </>
  );
};

export default PublicationForm;

const Database = require('./config')

const initDb = {
    async init() {
        const db = await Database()


        //CRIANDO AS TABELAS
        await db.exec(`CREATE TABLE cep (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cep TEXT,
            logradouro TEXT,
            complemento TEXT,
            bairro TEXT,
            localidade TEXT,
            uf TEXT,
            ibge TEXT,
            gia TEXT,
            ddd TEXT,
            siafi TEXT
        )`);
        await db.exec(`CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            name TEXT,
            password TEXT,
            ativo TEXT
        )`);
        await db.exec(`CREATE TABLE lista_de_desejo (
            id INTEGER PRIMARY KEY,
            IDproduto TEXT,
            quantidade TEXT,
            tamanho TEXT
        )`)
        //PRODUTOS
        await db.exec(`CREATE TABLE roupas (
            id INTEGER PRIMARY KEY,
            departamento TEXT,
            photo TEXT,
            nome TEXT,
            description TEXT,
            marca TEXT,
            cor TEXT,
            tamanho TEXT,
            price INT,
            quantidade INT,
            estoque INT,
            vendidos INT,
            avaliacao TEXT
        )`);
        await db.exec(`CREATE TABLE notebooks (
            id INTEGER PRIMARY KEY,
            departamento TEXT,
            photo TEXT,
            nome TEXT,
            description TEXT,
            marca TEXT,
            so TEXT,
            cpu TEXT,
            tela INT,
            m_ram INT,
            hd INT,
            placa_de_video TEXT,
            price INT,
            quantidade INT,
            estoque INT,
            vendidos INT,
            avaliacao TEXT
        )`);


        //povoando as tabelas
        await db.run(`INSERT INTO notebooks (
            id,
            departamento,
            photo,
            nome,
            description,
            marca,
            so,
            cpu,
            tela,
            m_ram,
            hd,
            placa_de_video,
            price,
            quantidade,
            estoque,
            vendidos,
            avaliacao
        ) VALUES (
            1,
            "notebook",
            "images/products/notebook-gamer.png",
            "Notebook Gamer Acer Nitro 5, Intel Core I5-10300H, 16GB, 512GB SSD, GeForce GTX 1650TI 4GB - AN515-55-50JB",
            "Um trem expresso direto para o centro da ação está chegando. O notebook gamer Acer Aspire Nitro 5 é a nova geração, com uma configuração que não treme para os jogos mais pesados. Embarque agora e prepare-se para a potência máxima. Se é poder que você quer para chegar mais rápido ao level avançado, conte com o desempenho do Processador Intel Core i5-10300H Quad Core de 10ª geração, além dos 16 GB de memória tipo DDR4. A super placa de vídeo NVIDIA GeForce GTX 1650TI com 4 GB de memória dedicada GDDR6 traz a performance que você precisa para surpreender seus adversários e jogar com alto nível de realismo. O Acer Aspire Nitro 5 vem equipado com 512 GB SSD, que possui velocidade de leitura e gravação mais rápida que um HD tradicional. Com seu sistema operacional e jogos instalados nele, tudo abrirá em poucos segundos! O chassi traz linhas inspiradas no mundo gamer, com acabamento premium texturizado e detalhes em vermelho. Os adversários já começam a partida respeitando seu time.",
            "acer",
            "linux",
            "i5",
            14,
            16,
            512,
            "GeForce GTX 1650TI 4GB",
            7368.32,
            0,
            5,
            4000,
            '{"s1":1, "s2":4, "s3":5, "s4":8, "s5":2}'
        )`)
        await db.run(`INSERT INTO notebooks (
            id,
            departamento,
            photo,
            nome,
            description,
            marca,
            so,
            cpu,
            tela,
            m_ram,
            hd,
            placa_de_video,
            price,
            quantidade,
            estoque,
            vendidos,
            avaliacao
        ) VALUES (
            2,
            "notebook",
            "images/products/notebook.png",
            "Notebook Dell Inspiron 15 3000, I15-3583-A3Xp, 8ª Geração Intel Core I5-8265U, 8 Gb Ram, Hd 1Tb, Intel® Uhd Graphics 620, Tela 15.6 Led Hd, Windows 10, Preto",
            "Com o Inspiron 15 3000, você terá uma nova perspectiva sobre como um notebook poderá te ajudar, seja no trabalho, estudo ou entretenimento. , após contato telefônico durante o horário comercial com o Suporte Dell. Conte com 15 meses do antivírus McAfee sem nenhum custo adicional, e Microsoft Office Trial (Versão para experimentação, válida por 30 dias). ESPECIFICAÇÕES TÉCNICASCor PretoProcessador 8ª Geração Intel Core i5-8265U (6MB Cache, 1. 6 Ghz até 3. 9 Ghz)Sistema Operacional Windows 10 Home Single Language 64 bit – em Português (Brasil)Memória RAM 8GB, DDR4, 2666MHz (8Gx1)Disco rígido (HD) 1TB 5400 rpm 2. 5' SATAPlaca de vídeo Intel UHD Graphics 620Tela LED de 15. 6' HD (1366 x 768) antirreflexoTeclado numérico, em português (Brasil) ABNT2, de tamanho normal resistente a derramamento de líquidosTouchpad com precisãoNão possui leitor e gravador de CD/DVD . Áudio: Waves MaxxAudio Pro . Webcam integrada: Em HD (720p) com microfone . Conectividade: Dell Wireless 802. 11ac + Bluetooth 4. 1, Dual Band 2. 4&5 Ghz, 1x1 . Chipset: Integrado ao processador . Bateria integrada de 3 Células ions de lítio (42 Whr) . 100 - 240 Volts AC (Bivolt) . Dimensões aproximadas: Altura: 1, 99 cm . Largura: 38 cm . Profundidade: 25, 80 cm . Peso aproximado: 2, 03 kgPortas2 portas USB 3. 1 de 1ª Ger. , 1 porta USB 2. 0, 1 porta HDMI 1. 4b, 1 porta de rede RJ-45 . Leitor de cartão de mídia: 1 Leitor de cartão SD (SD, SDHC, SDXC)Conteúdo da embalagem: Notebook, cabo de força, adaptador AC e manuais.",
            "dell",
            "windows 10",
            "i5",
            15.6,
            8,
            1000,
            "Intel® Uhd Graphics 620",
            1148.30,
            0,
            5,
            2500,
            '{"s1":1, "s2":4, "s3":5, "s4":8, "s5":4}'
        )`)
        await db.run(`INSERT INTO roupas (
            id,
            departamento,
            photo,
            nome,
            description,
            marca,
            cor,
            tamanho,
            price,
            quantidade,
            estoque,
            vendidos,
            avaliacao
        ) VALUES (
            3,
            "camisa",
            "images/products/camisa.png",
            "Camiseta Nike Sportwear Icon Futura Masculina - Preto+Branco",
            "Com o icônico logo da Nike estampado em destaque, essa camiseta masculina é a pedida certa para quem curte manter um visual confortável e casual. Esteja preparado e bem vestido em qualquer situação.",
            "nike",
            "preto",
            '{ "PP":1, "P": 6, "M": 5, "G": 3, "GG": 4 }',
            59.99,
            0,
            5,
            6000,
            '{"s1":1, "s2":1, "s3":2, "s4":3, "s5":7}'
        )`)
        await db.run(`INSERT INTO roupas (
            id,
            departamento,
            photo,
            nome,
            description,
            marca,
            cor,
            tamanho,
            price,
            quantidade,
            estoque,
            vendidos,
            avaliacao
        ) VALUES (
            4,
            "camisa",
            "images/products/camisa-2.png",
            "Camisa Social Masculina Manga Longa Vinho Maquinetada Vinho",
            "Camisa social masculina manga longa, vinho, detalhe maquinetado, tecido tricoline, modelagem slim, 1 bolso , pala reforçada com tecido contrastante.",
            "reserva",
            "vinho",
            '{ "PP":0, "P": 6, "M": 5, "G": 3, "GG": 4 }',
            59.99,
            0,
            5,
            200,
            '{"s1":1, "s2":1, "s3":5, "s4":1, "s5":4}'
        )`)
        await db.run(`INSERT INTO roupas (
            id,
            departamento,
            photo,
            nome,
            description,
            marca,
            cor,
            tamanho,
            price,
            quantidade,
            estoque,
            vendidos,
            avaliacao
        ) VALUES (
            5,
            "camisa",
            "images/products/camisa-3.png",
            "Coolmind 100% algodão engraçado impressão programador problema",
            "Coolmind 100% algodão engraçado impressão programador problema t camisa masculina casual verão camisa solta o-pescoço camiseta dos homens camisetas",
            "the coolmind",
            "branco",
            '{ "PP":0, "P": 6, "M": 5, "G": 3, "GG": 0 }',
            42.82,
            0,
            5,
            5999,
            '{"s1":0, "s2":1, "s3":1, "s4":9, "s5":12}'
        )`)
        await db.run(`INSERT INTO usuarios (
            email,
            name,
            password,
            ativo
        ) VALUES (
            "lucas@gmail.com",
            "lucas",
            "1",
            "true"
        )`);
        await db.run(`INSERT INTO cep (
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            ibge,
            gia,
            ddd,
            siafi
        ) VALUES (
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " "
        )`);

        await db.close()
    }
}

initDb.init()
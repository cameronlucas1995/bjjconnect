'use client';
import React, { useState } from 'react';
import { 
  Shield, Trophy, GraduationCap, Building2, ChevronRight,
  Home, Search, Calendar, Users, Store, Settings, 
  Star, Award, MapPin, Plus, LogOut, X, Heart, Share2
} from 'lucide-react';

export default function BJJConnectApp() {
  // Estados principais
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Estados de busca
  const [searchFilters, setSearchFilters] = useState({
    userType: '',
    location: '',
    graduation: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Estados do marketplace
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userTokens, setUserTokens] = useState(2500);
  
  // Estados de eventos
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [userRegisteredEvents, setUserRegisteredEvents] = useState([]);
  
  // Estados de configurações
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState({
    name: 'Usuário Demo',
    email: 'usuario@exemplo.com',
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
    bio: 'Apaixonado pelo Jiu-Jitsu há 5 anos...',
    privacy: 'public',
    allowMessages: true,
    showEmail: false
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    communityUpdates: true,
    marketplaceOffers: false,
    weeklyDigest: true
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    dataSharing: false,
    analyticsTracking: true
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estados de formulários
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Campos específicos do atleta
    belt: '',
    academy: '',
    weight: '',
    experience: '',
    // Campos específicos da academia
    cnpj: '',
    address: '',
    phone: '',
    website: '',
    // Campos específicos do professor
    certification: '',
    specialties: '',
    // Campos específicos do patrocinador
    company: '',
    sector: '',
    budget: ''
  });

  // Configurações de tipos de usuário
  const userTypes = [
    {
      id: 'athlete',
      title: 'Atleta',
      icon: Trophy,
      description: 'Registre seu cartel, participe de seminários e busque patrocínio',
      color: 'bg-blue-500'
    },
    {
      id: 'academy',
      title: 'Academia',
      icon: Building2,
      description: 'Gerencie eventos, busque patrocinadores e emita certificados NFT',
      color: 'bg-green-500'
    },
    {
      id: 'instructor',
      title: 'Professor',
      icon: GraduationCap,
      description: 'Conecte-se com academias e organize seminários',
      color: 'bg-purple-500'
    },
    {
      id: 'sponsor',
      title: 'Patrocinador',
      icon: Shield,
      description: 'Lance produtos no marketplace e patrocine atletas e eventos',
      color: 'bg-orange-500'
    }
  ];

  // Dados mock limpos
  const mockUsers = [
    {
      id: 1, 
      type: 'athlete', 
      name: 'Carlos Silva', 
      belt: 'Faixa Preta', 
      location: 'São Paulo',
      academy: 'Gracie Barra', 
      record: { wins: 25, losses: 3 }, 
      specialty: 'Guarda Fechada',
      fanTokens: 2150, 
      nfts: 12, 
      bio: 'Campeão Mundial IBJJF 2022, especialista em jogo de guarda.',
      achievements: ['Campeão Mundial IBJJF 2022', 'Campeão Pan-Americano 2021', 'Faixa Preta há 8 anos']
    },
    {
      id: 2, 
      type: 'athlete', 
      name: 'Ana Santos', 
      belt: 'Faixa Roxa', 
      location: 'Rio de Janeiro',
      academy: 'Alliance', 
      record: { wins: 18, losses: 2 }, 
      specialty: 'Pressão e Controle',
      fanTokens: 1850, 
      nfts: 8, 
      bio: 'Bicampeã Brasileira, focada em jogo de cima.',
      achievements: ['Bicampeã Brasileira', 'Campeã Estadual RJ 2023']
    },
    {
      id: 3, 
      type: 'academy', 
      name: 'Gracie Barra SP Centro', 
      belt: '', 
      location: 'São Paulo',
      academy: 'Gracie Barra Network', 
      specialty: 'BJJ Tradicional',
      fanTokens: 5200, 
      nfts: 25, 
      bio: 'Academia tradicional com mais de 20 anos de história.',
      students: 150,
      instructors: ['Mestre Carlos', 'Professor João', 'Professora Maria']
    },
    {
      id: 4, 
      type: 'instructor', 
      name: 'Professor Ricardo', 
      belt: 'Faixa Coral', 
      location: 'Brasília',
      academy: 'CheckMat', 
      specialty: 'Seminários e Desenvolvimento',
      fanTokens: 3800, 
      nfts: 18, 
      bio: 'Instrutor com 25 anos de experiência, especialista em desenvolvimento de atletas.',
      seminars: ['Guarda Spider Avançada', 'Defesas de Passagem', 'Preparação Mental']
    },
    {
      id: 5, 
      type: 'sponsor', 
      name: 'BJJ Gear Brasil', 
      belt: '', 
      location: 'Nacional',
      specialty: 'Equipamentos e Kimonos',
      fanTokens: 8500, 
      nfts: 45, 
      bio: 'Maior fornecedor de equipamentos de BJJ do Brasil.',
      products: ['Kimonos Premium', 'Rashguards', 'Faixas Oficiais', 'Acessórios']
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: 'Campeonato Estadual de São Paulo',
      date: '2024-12-15',
      time: '08:00',
      location: 'Centro de Convenções Anhembi - São Paulo/SP',
      organizer: 'FPJJSP',
      category: 'Competição',
      price: 120,
      tokens: 60,
      description: 'Maior campeonato estadual do ano com todas as categorias de peso e idade.',
      participants: 340,
      maxParticipants: 500,
      image: '/api/placeholder/400/250',
      tags: ['Gi', 'No-Gi', 'Juvenil', 'Adulto', 'Master'],
      prizes: ['Medalhas', 'Troféus', 'Premiação em dinheiro']
    },
    {
      id: 2,
      title: 'Seminário: Guarda Spider Avançada',
      date: '2024-11-20',
      time: '14:00',
      location: 'Gracie Barra São Paulo Centro',
      organizer: 'Professor Ricardo Santos',
      category: 'Seminário',
      price: 89,
      tokens: 45,
      description: 'Aprenda técnicas avançadas de guarda spider com um dos maiores especialistas do Brasil.',
      participants: 25,
      maxParticipants: 40,
      image: '/api/placeholder/400/250',
      tags: ['Técnico', 'Avançado', 'Guarda'],
      duration: '3 horas'
    },
    {
      id: 3,
      title: 'Open Mat Interacademias',
      date: '2024-11-25',
      time: '10:00',
      location: 'CheckMat Brasília',
      organizer: 'CheckMat Network',
      category: 'Treino',
      price: 0,
      tokens: 0,
      description: 'Treino aberto para todas as academias. Venha conhecer novos parceiros de treino!',
      participants: 45,
      maxParticipants: 60,
      image: '/api/placeholder/400/250',
      tags: ['Gratuito', 'Open Mat', 'Networking'],
      duration: '4 horas'
    },
    {
      id: 4,
      title: 'Copa Rio de Janeiro BJJ',
      date: '2024-12-08',
      time: '09:00',
      location: 'Ginásio Maracanãzinho - Rio de Janeiro/RJ',
      organizer: 'FJJD-Rio',
      category: 'Competição',
      price: 100,
      tokens: 50,
      description: 'Tradicional competição carioca reunindo os melhores atletas do estado.',
      participants: 280,
      maxParticipants: 400,
      image: '/api/placeholder/400/250',
      tags: ['Gi', 'Tradicional', 'Rio de Janeiro'],
      prizes: ['Medalhas IBJJF', 'Troféus', 'Kimonos']
    },
    {
      id: 5,
      title: 'Workshop: Preparação Mental para Competições',
      date: '2024-11-30',
      time: '16:00',
      location: 'Online (Zoom)',
      organizer: 'Psicóloga Esportiva Marina Lima',
      category: 'Workshop',
      price: 45,
      tokens: 25,
      description: 'Desenvolva sua mentalidade competitiva e aprenda a lidar com a pressão.',
      participants: 15,
      maxParticipants: 50,
      image: '/api/placeholder/400/250',
      tags: ['Online', 'Mental', 'Competição'],
      duration: '2 horas'
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Carlos Silva',
      authorType: 'athlete',
      time: '2 horas atrás',
      content: 'Acabei de conquistar minha faixa preta! 8 anos de dedicação valeram a pena. Obrigado a todos que me apoiaram nesta jornada! 🥋🖤',
      likes: 124,
      comments: 23,
      shares: 8,
      image: '/api/placeholder/400/300',
      tags: ['#faixapreta', '#conquista', '#bjj']
    },
    {
      id: 2,
      author: 'Academia Gracie Barra SP',
      authorType: 'academy',
      time: '5 horas atrás',
      content: 'Estamos com inscrições abertas para nosso curso de defesa pessoal feminina! Aulas especiais às terças e quintas, 19h. Venham conhecer! 💪👩',
      likes: 89,
      comments: 15,
      shares: 12,
      tags: ['#defesapessoal', '#feminino', '#graciebarra']
    },
    {
      id: 3,
      author: 'Ana Santos',
      authorType: 'athlete',
      time: '1 dia atrás',
      content: 'Dica para iniciantes: não desistam nos primeiros meses! O Jiu-Jitsu é uma jornada, não uma corrida. Cada treino é uma evolução. 🚀',
      likes: 156,
      comments: 31,
      shares: 19,
      tags: ['#motivacao', '#iniciantes', '#dicas']
    },
    {
      id: 4,
      author: 'Professor Ricardo',
      authorType: 'instructor',
      time: '1 dia atrás',
      content: 'Técnica do dia: Raspagem da guarda fechada com quebra de postura. Vídeo completo no meu canal! Link nos comentários 📹',
      likes: 201,
      comments: 18,
      shares: 34,
      video: true,
      tags: ['#tecnica', '#guardafechada', '#raspagem']
    },
    {
      id: 5,
      author: 'BJJ Gear Brasil',
      authorType: 'sponsor',
      time: '2 dias atrás',
      content: 'Promoção especial: 30% OFF em todos os kimonos! Válido até o final do mês. Use o cupom: BJJ30 🥋',
      likes: 78,
      comments: 9,
      shares: 25,
      tags: ['#promocao', '#kimono', '#bjjgear']
    }
  ];

  const marketplaceProducts = [
    {
      id: 1,
      name: 'Kimono Gi Premium',
      price: 299,
      tokens: 150,
      category: 'Equipamentos',
      seller: 'BJJ Gear Brasil',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      description: 'Kimono de alta qualidade, tecido resistente'
    },
    {
      id: 2,
      name: 'Seminário - Guarda Spider',
      price: 89,
      tokens: 45,
      category: 'Educação',
      seller: 'Professor Ricardo',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      description: 'Seminário online sobre técnicas de guarda spider'
    },
    {
      id: 3,
      name: 'NFT - Certificado Faixa Preta',
      price: 199,
      tokens: 100,
      category: 'NFT',
      seller: 'Gracie Barra SP Centro',
      image: '/api/placeholder/300/200',
      rating: 5.0,
      description: 'Certificado digital único de faixa preta'
    }
  ];

  // Funções de navegação
  const handleUserTypeSelect = (userType) => {
    console.log('Tipo de usuário selecionado:', userType);
    setSelectedUserType(userType);
    setCurrentScreen('register');
  };

  const handleLogin = () => {
    console.log('Login realizado para:', selectedUserType);
    setUserProfile({
      name: formData.name,
      type: selectedUserType,
      tokens: 2500,
      ...formData
    });
    setCurrentScreen('dashboard');
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setSelectedUserType('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      belt: '',
      academy: '',
      weight: '',
      experience: '',
      cnpj: '',
      address: '',
      phone: '',
      website: '',
      certification: '',
      specialties: '',
      company: '',
      sector: '',
      budget: ''
    });
  };

  const handleLogout = () => {
    console.log('Logout realizado');
    setCurrentScreen('welcome');
    setSelectedUserType('');
    setUserProfile(null);
    setActiveTab('dashboard');
  };

  // Funções de busca
  const handleSearch = () => {
    console.log('Busca realizada com filtros:', searchFilters);
    let results = mockUsers;
    
    if (searchFilters.userType) {
      results = results.filter(user => user.type === searchFilters.userType);
    }
    if (searchFilters.location) {
      results = results.filter(user => 
        user.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleViewProfile = (profile) => {
    console.log('Visualizando perfil:', profile.name);
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  // Funções do marketplace
  const handlePurchase = (product) => {
    console.log('Comprando produto:', product.name);
    setSelectedProduct(product);
    setShowCheckout(true);
  };

  const confirmPurchase = () => {
    console.log('Compra confirmada:', selectedProduct.name);
    setUserTokens(prev => prev - selectedProduct.tokens);
    setShowCheckout(false);
    setSelectedProduct(null);
    alert(`Compra realizada com sucesso! ${selectedProduct.name}`);
  };

  // Funções de eventos
  const handleEventRegistration = (event) => {
    console.log('Inscrevendo no evento:', event.title);
    if (event.tokens > 0 && userTokens < event.tokens) {
      alert('Tokens insuficientes para se inscrever neste evento!');
      return;
    }
    
    setUserTokens(prev => prev - event.tokens);
    setUserRegisteredEvents(prev => [...prev, event.id]);
    setShowEventModal(false);
    alert(`Inscrição confirmada para: ${event.title}`);
  };

  const handleViewEvent = (event) => {
    console.log('Visualizando evento:', event.title);
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Funções da comunidade
  const handleLike = (postId) => {
    console.log('Curtindo post:', postId);
    // Simula curtir post
  };

  const handleComment = (postId) => {
    console.log('Comentando no post:', postId);
    // Simula comentário
  };

  const handleShare = (postId) => {
    console.log('Compartilhando post:', postId);
    // Simula compartilhamento
  };

  // Funções de configurações
  const updateProfileSettings = (field, value) => {
    setProfileSettings(prev => ({ ...prev, [field]: value }));
    console.log('Configuração de perfil atualizada:', field, value);
  };

  const updateNotificationSettings = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
    console.log('Configuração de notificação atualizada:', field, value);
  };

  const updateSecuritySettings = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
    console.log('Configuração de segurança atualizada:', field, value);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      return;
    }
    console.log('Senha alterada com sucesso!');
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Senha alterada com sucesso!');
  };

  const handleExportData = () => {
    console.log('Exportando dados do usuário...');
    // Simula exportação de dados
    const userData = {
      profile: profileSettings,
      registeredEvents: userRegisteredEvents,
      tokens: userTokens,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bjj-connect-dados.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível!')) {
      console.log('Conta excluída!');
      alert('Conta excluída com sucesso. Você será redirecionado para a tela inicial.');
      handleLogout();
    }
  };

  // Componente: Tela de Cadastro
  const RegisterScreen = () => {
    const currentUserType = userTypes.find(type => type.id === selectedUserType);
    const IconComponent = currentUserType?.icon;

    const renderAthleteFields = () => (
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduação</label>
            <select
              value={formData.belt}
              onChange={(e) => handleFormChange('belt', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione sua faixa</option>
              <option value="Faixa Branca">Faixa Branca</option>
              <option value="Faixa Azul">Faixa Azul</option>
              <option value="Faixa Roxa">Faixa Roxa</option>
              <option value="Faixa Marrom">Faixa Marrom</option>
              <option value="Faixa Preta">Faixa Preta</option>
              <option value="Faixa Coral">Faixa Coral</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleFormChange('weight', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: 75"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academia</label>
          <input
            type="text"
            value={formData.academy}
            onChange={(e) => handleFormChange('academy', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nome da sua academia"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Experiência</label>
          <input
            type="text"
            value={formData.experience}
            onChange={(e) => handleFormChange('experience', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 5 anos"
          />
        </div>
      </>
    );

    const renderAcademyFields = () => (
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) => handleFormChange('cnpj', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="00.000.000/0000-00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleFormChange('address', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Rua, número, bairro, cidade"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website (opcional)</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleFormChange('website', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="https://suaacademia.com.br"
          />
        </div>
      </>
    );

    const renderInstructorFields = () => (
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduação</label>
            <select
              value={formData.belt}
              onChange={(e) => handleFormChange('belt', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Selecione sua faixa</option>
              <option value="Faixa Marrom">Faixa Marrom</option>
              <option value="Faixa Preta">Faixa Preta</option>
              <option value="Faixa Coral">Faixa Coral</option>
              <option value="Faixa Vermelha">Faixa Vermelha</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Experiência</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => handleFormChange('experience', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Ex: 15 anos"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificações</label>
          <input
            type="text"
            value={formData.certification}
            onChange={(e) => handleFormChange('certification', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="IBJJF, CBJJ, etc."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Especialidades</label>
          <textarea
            value={formData.specialties}
            onChange={(e) => handleFormChange('specialties', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Descreva suas especialidades e áreas de ensino..."
            rows={3}
          />
        </div>
      </>
    );

    const renderSponsorFields = () => (
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleFormChange('company', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nome da sua empresa"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Setor de Atuação</label>
            <select
              value={formData.sector}
              onChange={(e) => handleFormChange('sector', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Selecione o setor</option>
              <option value="Equipamentos Esportivos">Equipamentos Esportivos</option>
              <option value="Nutrição e Suplementos">Nutrição e Suplementos</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Saúde e Bem-estar">Saúde e Bem-estar</option>
              <option value="Educação">Educação</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento Mensal para Patrocínios</label>
          <select
            value={formData.budget}
            onChange={(e) => handleFormChange('budget', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          >
            <option value="">Selecione o orçamento</option>
            <option value="Até R$ 5.000">Até R$ 5.000</option>
            <option value="R$ 5.000 - R$ 15.000">R$ 5.000 - R$ 15.000</option>
            <option value="R$ 15.000 - R$ 50.000">R$ 15.000 - R$ 50.000</option>
            <option value="Acima de R$ 50.000">Acima de R$ 50.000</option>
          </select>
        </div>
      </>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToWelcome}
              className="mb-4 text-gray-500 hover:text-gray-700 transition-colors flex items-center"
            >
              ← Voltar para seleção
            </button>
            
            <div className={`w-16 h-16 ${currentUserType?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cadastro - {currentUserType?.title}
            </h1>
            <p className="text-gray-600">
              {currentUserType?.description}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            {/* Campos comuns */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleFormChange('password', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Repita sua senha"
                  required
                />
              </div>
            </div>

            {/* Campos específicos por tipo */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informações Específicas
              </h3>
              <div className="space-y-4">
                {selectedUserType === 'athlete' && renderAthleteFields()}
                {selectedUserType === 'academy' && renderAcademyFields()}
                {selectedUserType === 'instructor' && renderInstructorFields()}
                {selectedUserType === 'sponsor' && renderSponsorFields()}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={handleBackToWelcome}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex-1 ${currentUserType?.color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
              >
                Criar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Componente: Tela de Boas-vindas
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🥋 BJJ Connect
          </h1>
          <p className="text-lg text-gray-600">
            A plataforma definitiva para conectar a comunidade do Jiu-Jitsu Brasileiro
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <div
                key={type.id}
                onClick={() => handleUserTypeSelect(type.id)}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg group"
              >
                <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {type.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Cadastrar como {type.title}</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center border-t pt-6">
          <p className="text-gray-600 mb-4">Já possui uma conta?</p>
          <button
            onClick={() => {
              // Simulação de login rápido para demonstração
              setSelectedUserType('athlete');
              setFormData(prev => ({ ...prev, name: 'Usuário Demo' }));
              setUserProfile({
                name: 'Usuário Demo',
                type: 'athlete',
                tokens: 2500
              });
              setCurrentScreen('dashboard');
            }}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Entrar com Conta Existente
          </button>
          <p className="text-xs text-gray-500 mt-2">
            (Demo: entra como atleta de exemplo)
          </p>
        </div>
      </div>
    </div>
  );

  // Componente: Sidebar
  const Sidebar = () => (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">🥋 BJJ Connect</h2>
        <p className="text-sm text-gray-600 mt-1">{userProfile?.name}</p>
        <div className="flex items-center mt-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {userTokens} tokens
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'search', label: 'Buscar', icon: Search },
            { id: 'events', label: 'Eventos', icon: Calendar },
            { id: 'community', label: 'Comunidade', icon: Users },
            { id: 'marketplace', label: 'Marketplace', icon: Store },
            { id: 'settings', label: 'Configurações', icon: Settings }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );

  // Componente: Dashboard
  const Dashboard = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Fan Tokens</p>
              <p className="text-3xl font-bold">{userTokens}</p>
            </div>
            <Trophy className="w-10 h-10 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Conexões</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <Users className="w-10 h-10 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">NFTs</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <Award className="w-10 h-10 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          {[
            { action: 'Novo seguidor', user: 'Ana Santos', time: '2h atrás' },
            { action: 'Compra realizada', item: 'Seminário Guarda Spider', time: '1 dia atrás' },
            { action: 'Evento confirmado', event: 'Campeonato Regional SP', time: '2 dias atrás' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.user || activity.item || activity.event}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Componente: Busca
  const SearchTab = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Buscar na Comunidade</h1>
      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <select
            value={searchFilters.userType}
            onChange={(e) => setSearchFilters({...searchFilters, userType: e.target.value})}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Todos os tipos</option>
            <option value="athlete">Atletas</option>
            <option value="academy">Academias</option>
            <option value="instructor">Professores</option>
            <option value="sponsor">Patrocinadores</option>
          </select>

          <input
            type="text"
            placeholder="Localização"
            value={searchFilters.location}
            onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={searchFilters.graduation}
            onChange={(e) => setSearchFilters({...searchFilters, graduation: e.target.value})}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Todas as graduações</option>
            <option value="branca">Faixa Branca</option>
            <option value="azul">Faixa Azul</option>
            <option value="roxa">Faixa Roxa</option>
            <option value="marrom">Faixa Marrom</option>
            <option value="preta">Faixa Preta</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Search className="w-4 h-4 inline mr-2" />
          Buscar
        </button>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Resultados ({searchResults.length})
            </h2>
          </div>
          <div className="divide-y">
            {searchResults.map((user) => (
              <div key={user.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.belt} • {user.location}</p>
                    <p className="text-xs text-gray-500">{user.academy}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewProfile(user)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Ver Perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Componente: Eventos
  const EventsTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Eventos BJJ</h1>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option value="">Todos os tipos</option>
            <option value="competition">Competições</option>
            <option value="seminar">Seminários</option>
            <option value="workshop">Workshops</option>
            <option value="training">Treinos</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option value="">Todas as localizações</option>
            <option value="sp">São Paulo</option>
            <option value="rj">Rio de Janeiro</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl flex items-center justify-center">
              <Calendar className="w-16 h-16 text-white opacity-50" />
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  event.category === 'Competição' ? 'bg-red-100 text-red-800' :
                  event.category === 'Seminário' ? 'bg-blue-100 text-blue-800' :
                  event.category === 'Workshop' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.category}
                </span>
                {event.price === 0 ? (
                  <span className="text-green-600 font-bold text-sm">GRATUITO</span>
                ) : (
                  <span className="text-blue-600 font-bold text-sm">{event.tokens} tokens</span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
              
              <div className="space-y-1 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {event.participants}/{event.maxParticipants} inscritos
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewEvent(event)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Ver Detalhes
                </button>
                <button
                  onClick={() => handleEventRegistration(event)}
                  disabled={userRegisteredEvents.includes(event.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userRegisteredEvents.includes(event.id)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : event.price === 0
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {userRegisteredEvents.includes(event.id) ? 'Inscrito' : 'Inscrever-se'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Componente: Comunidade
  const CommunityTab = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed da Comunidade</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Nova Publicação
        </button>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {communityPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-start mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                post.authorType === 'athlete' ? 'bg-blue-500' :
                post.authorType === 'academy' ? 'bg-green-500' :
                post.authorType === 'instructor' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}>
                {post.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-900 mr-2">{post.author}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.authorType === 'athlete' ? 'bg-blue-100 text-blue-800' :
                    post.authorType === 'academy' ? 'bg-green-100 text-green-800' :
                    post.authorType === 'instructor' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {post.authorType === 'athlete' ? 'Atleta' :
                     post.authorType === 'academy' ? 'Academia' :
                     post.authorType === 'instructor' ? 'Professor' : 'Patrocinador'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
              
              {post.image && (
                <div className="mt-3 h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">🖼️ Imagem do post</span>
                </div>
              )}
              
              {post.video && (
                <div className="mt-3 h-64 bg-gradient-to-r from-blue-200 to-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700">🎥 Vídeo técnica</span>
                </div>
              )}
              
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-blue-600 text-sm hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5 mr-1" />
                    {post.likes}
                  </button>
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <span className="w-5 h-5 mr-1">💬</span>
                    {post.comments}
                  </button>
                  <button 
                    onClick={() => handleShare(post.id)}
                    className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-1" />
                    {post.shares}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <p className="text-gray-500">Fim do feed. Que tal seguir mais pessoas?</p>
          <button className="mt-2 text-blue-600 hover:underline">
            Descobrir mais usuários
          </button>
        </div>
      </div>
    </div>
  );

  // Componente: Configurações
  const SettingsTab = () => {
    const settingsTabs = [
      { id: 'profile', label: 'Perfil', icon: '👤' },
      { id: 'notifications', label: 'Notificações', icon: '🔔' },
      { id: 'security', label: 'Segurança', icon: '🔒' },
      { id: 'privacy', label: 'Privacidade', icon: '🛡️' },
      { id: 'account', label: 'Conta', icon: '⚙️' }
    ];

    const renderProfileSettings = () => (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
            {profileSettings.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profileSettings.name}</h3>
            <p className="text-gray-600">{selectedUserType === 'athlete' ? 'Atleta' : selectedUserType === 'academy' ? 'Academia' : selectedUserType === 'instructor' ? 'Professor' : 'Patrocinador'}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              value={profileSettings.name}
              onChange={(e) => updateProfileSettings('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profileSettings.email}
              onChange={(e) => updateProfileSettings('email', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              type="tel"
              value={profileSettings.phone}
              onChange={(e) => updateProfileSettings('phone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
            <input
              type="text"
              value={profileSettings.location}
              onChange={(e) => updateProfileSettings('location', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cidade, Estado"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
          <textarea
            value={profileSettings.bio}
            onChange={(e) => updateProfileSettings('bio', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Conte um pouco sobre você..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Visibilidade do Perfil</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={profileSettings.privacy === 'public'}
                onChange={(e) => updateProfileSettings('privacy', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">🌍 Público</span>
                <p className="text-sm text-gray-600">Qualquer pessoa pode ver seu perfil</p>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                value="community"
                checked={profileSettings.privacy === 'community'}
                onChange={(e) => updateProfileSettings('privacy', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">👥 Comunidade BJJ</span>
                <p className="text-sm text-gray-600">Apenas membros da comunidade BJJ</p>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                value="private"
                checked={profileSettings.privacy === 'private'}
                onChange={(e) => updateProfileSettings('privacy', e.target.value)}
                className="mr-3"
              />
              <div>
                <span className="font-medium text-gray-900">🔒 Privado</span>
                <p className="text-sm text-gray-600">Apenas suas conexões podem ver</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    );

    const renderNotificationSettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preferências de Notificação</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📧 Notificações por Email</h4>
                <p className="text-sm text-gray-600">Receba atualizações importantes por email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => updateNotificationSettings('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">🔔 Notificações Push</h4>
                <p className="text-sm text-gray-600">Receba alertas no navegador</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => updateNotificationSettings('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📅 Lembretes de Eventos</h4>
                <p className="text-sm text-gray-600">Lembretes de eventos que você se inscreveu</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.eventReminders}
                  onChange={(e) => updateNotificationSettings('eventReminders', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">👥 Atividade da Comunidade</h4>
                <p className="text-sm text-gray-600">Novos posts, comentários e interações</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.communityUpdates}
                  onChange={(e) => updateNotificationSettings('communityUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">🛍️ Ofertas do Marketplace</h4>
                <p className="text-sm text-gray-600">Promoções e novos produtos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.marketplaceOffers}
                  onChange={(e) => updateNotificationSettings('marketplaceOffers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📈 Resumo Semanal</h4>
                <p className="text-sm text-gray-600">Resumo das suas atividades da semana</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyDigest}
                  onChange={(e) => updateNotificationSettings('weeklyDigest', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );

    const renderSecuritySettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança da Conta</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">🔑 Alterar Senha</h4>
                <button
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {showPasswordChange ? 'Cancelar' : 'Alterar'}
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">Mantenha sua conta segura com uma senha forte</p>
              
              {showPasswordChange && (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Senha atual"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Nova senha (mín. 6 caracteres)"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    Confirmar Alteração
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">🔐 Autenticação de Dois Fatores</h4>
                <p className="text-sm text-gray-600">Camada extra de segurança para sua conta</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) => updateSecuritySettings('twoFactorAuth', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">🚨 Alertas de Login</h4>
                <p className="text-sm text-gray-600">Receba alertas de novos logins na sua conta</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.loginAlerts}
                  onChange={(e) => updateSecuritySettings('loginAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );

    const renderPrivacySettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Controle de Privacidade</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">👥 Permitir Mensagens</h4>
                <p className="text-sm text-gray-600">Outros usuários podem enviar mensagens diretas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileSettings.allowMessages}
                  onChange={(e) => updateProfileSettings('allowMessages', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📧 Mostrar Email no Perfil</h4>
                <p className="text-sm text-gray-600">Seu email será visível para outros usuários</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileSettings.showEmail}
                  onChange={(e) => updateProfileSettings('showEmail', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📄 Compartilhamento de Dados</h4>
                <p className="text-sm text-gray-600">Permitir uso de dados para melhorias da plataforma</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.dataSharing}
                  onChange={(e) => updateSecuritySettings('dataSharing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">📈 Rastreamento de Analytics</h4>
                <p className="text-sm text-gray-600">Ajuda a melhorar a experiência do usuário</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.analyticsTracking}
                  onChange={(e) => updateSecuritySettings('analyticsTracking', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );

    const renderAccountSettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gerenciamento da Conta</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">📦 Exportar Dados</h4>
              <p className="text-sm text-gray-600 mb-3">
                Baixe uma cópia dos seus dados pessoais em formato JSON
              </p>
              <button
                onClick={handleExportData}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Exportar Meus Dados
              </button>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">⚠️ Zona de Perigo</h4>
              <p className="text-sm text-gray-600 mb-3">
                Ações irreversíveis que afetam permanentemente sua conta
              </p>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Excluir Conta Permanentemente
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Esta ação não pode ser desfeita. Todos os seus dados serão perdidos.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">📊 Estatísticas da Conta</h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{userTokens}</p>
                  <p className="text-sm text-gray-600">Fan Tokens</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{userRegisteredEvents.length}</p>
                  <p className="text-sm text-gray-600">Eventos Inscritos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">24</p>
                  <p className="text-sm text-gray-600">Conexões</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <p className="text-sm text-gray-600">NFTs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
        
        <div className="flex gap-6">
          {/* Sidebar de configurações */}
          <div className="w-64 bg-white rounded-xl shadow p-4">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingsTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSettingsTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Conteúdo das configurações */}
          <div className="flex-1 bg-white rounded-xl shadow p-6">
            {activeSettingsTab === 'profile' && renderProfileSettings()}
            {activeSettingsTab === 'notifications' && renderNotificationSettings()}
            {activeSettingsTab === 'security' && renderSecuritySettings()}
            {activeSettingsTab === 'privacy' && renderPrivacySettings()}
            {activeSettingsTab === 'account' && renderAccountSettings()}
          </div>
        </div>
      </div>
    );
  };

  // Componente: Marketplace
  const Marketplace = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Marketplace</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {marketplaceProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <Store className="w-12 h-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-green-600">
                  R$ {product.price}
                </span>
                <span className="text-sm text-blue-600">
                  {product.tokens} tokens
                </span>
              </div>
              <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
              <button
                onClick={() => handlePurchase(product)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Modal: Perfil do Usuário
  const ProfileModal = () => (
    showProfileModal && selectedProfile && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Perfil Completo</h2>
            <button
              onClick={() => setShowProfileModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                {selectedProfile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{selectedProfile.name}</h3>
                {selectedProfile.belt && (
                  <p className="text-lg text-blue-600 font-medium">{selectedProfile.belt}</p>
                )}
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{selectedProfile.location}</span>
                </div>
                {selectedProfile.academy && (
                  <p className="text-gray-600">🏛️ {selectedProfile.academy}</p>
                )}
              </div>
            </div>

            {selectedProfile.record && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Cartel</h4>
                <div className="flex space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedProfile.record.wins}
                    </p>
                    <p className="text-sm text-gray-600">Vitórias</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {selectedProfile.record.losses}
                    </p>
                    <p className="text-sm text-gray-600">Derrotas</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Biografia</h4>
              <p className="text-gray-700">{selectedProfile.bio}</p>
            </div>

            {selectedProfile.specialty && (
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Especialidade</h4>
                <p className="text-gray-700">{selectedProfile.specialty}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {selectedProfile.fanTokens || 0}
                </p>
                <p className="text-sm text-gray-600">Fan Tokens</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {selectedProfile.nfts || 0}
                </p>
                <p className="text-sm text-gray-600">NFTs</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                <Users className="w-4 h-4 inline mr-2" />
                Conectar
              </button>
              <button className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                <Heart className="w-4 h-4 inline mr-2" />
                Patrocinar
              </button>
              <button className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Modal: Detalhes do Evento
  const EventModal = () => (
    showEventModal && selectedEvent && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-screen overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Detalhes do Evento</h2>
            <button
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-24 h-24 text-white opacity-50" />
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedEvent.category === 'Competição' ? 'bg-red-100 text-red-800' :
                  selectedEvent.category === 'Seminário' ? 'bg-blue-100 text-blue-800' :
                  selectedEvent.category === 'Workshop' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }}`}>
                  {selectedEvent.category}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">📅 Data e Horário</h4>
                  <p className="text-gray-700">
                    {new Date(selectedEvent.date).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-600">{selectedEvent.time}</p>
                  {selectedEvent.duration && (
                    <p className="text-sm text-gray-500">Duração: {selectedEvent.duration}</p>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🗺️ Localização</h4>
                  <p className="text-gray-700">{selectedEvent.location}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">👥 Organização</h4>
                  <p className="text-gray-700">{selectedEvent.organizer}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">💰 Investimento</h4>
                  {selectedEvent.price === 0 ? (
                    <p className="text-green-600 font-bold">GRATUITO</p>
                  ) : (
                    <div>
                      <p className="text-gray-700">R$ {selectedEvent.price}</p>
                      <p className="text-blue-600">{selectedEvent.tokens} tokens</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">👥 Participantes</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(selectedEvent.participants / selectedEvent.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedEvent.participants}/{selectedEvent.maxParticipants}
                    </span>
                  </div>
                </div>

                {selectedEvent.prizes && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">🏆 Premiação</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      {selectedEvent.prizes.map((prize, index) => (
                        <li key={index}>• {prize}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {selectedEvent.tags && (
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">🏷️ Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3 pt-6 border-t">
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => handleEventRegistration(selectedEvent)}
                disabled={userRegisteredEvents.includes(selectedEvent.id)}
                className={`flex-2 py-3 px-6 rounded-lg font-medium transition-colors ${
                  userRegisteredEvents.includes(selectedEvent.id)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : selectedEvent.price === 0
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : userTokens >= selectedEvent.tokens
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-red-500 text-white cursor-not-allowed'
                }`}
              >
                {userRegisteredEvents.includes(selectedEvent.id) ? 'Já inscrito' :
                 selectedEvent.tokens > userTokens ? 'Tokens insuficientes' :
                 'Confirmar Inscrição'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Modal: Checkout
  const CheckoutModal = () => (
    showCheckout && selectedProduct && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Confirmar Compra</h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg">{selectedProduct.name}</h3>
              <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Preço:</span>
                <span className="font-bold text-green-600">R$ {selectedProduct.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tokens necessários:</span>
                <span className="font-bold text-blue-600">{selectedProduct.tokens}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700">Seus tokens:</span>
              <span className={`font-bold ${userTokens >= selectedProduct.tokens ? 'text-green-600' : 'text-red-600'}`}>
                {userTokens}
              </span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPurchase}
                disabled={userTokens < selectedProduct.tokens}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Componente Principal
  if (currentScreen === 'welcome') {
    return <WelcomeScreen />;
  }

  if (currentScreen === 'register') {
    return <RegisterScreen />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'search' && <SearchTab />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'community' && <CommunityTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>

      <ProfileModal />
      <EventModal />
      <CheckoutModal />
    </div>
  );
}

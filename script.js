document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // --- Data ---
    const userData = {
        profilePic: 'realistic-pfp.jpg',
        name: 'Ugur Andaç',
        subtitle: 'Elektrik Elektronik Müh.',
        card: {
            pic: 'anime-pfp.jfif',
            name: 'Ugur',
            status: 'Aksaray Üniversitesi'
        },
        socialLinks: [
            { href: 'https://github.com/UgurCelikcan', icon: 'fab fa-github' },
            { href: 'https://www.linkedin.com/in/ugur-andac/', icon: 'fab fa-linkedin' },
            { href: 'https://x.com/ugu_andac', icon: 'fab fa-x-twitter' },
            { href: 'discord://ugur_andac', icon: 'fab fa-discord' },
            { href: 'https://www.instagram.com/privetyaugur/', icon: 'fab fa-instagram' }
        ]
    };

    // --- Video Background ---
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true; // Start muted
    video.loop = true;
    video.id = 'background-video';
    video.volume = 0; // Volume starts at 0
    const source = document.createElement('source');
    source.src = 'background-video.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    document.body.prepend(video);

    // Tarayıcıların autoplay (otomatik oynatma) engeline takılmamak için deneme
    video.play().catch(error => {
        console.log("Otomatik oynatma engellendi, ses için etkileşim bekleniyor.");
        video.muted = true; // Engel varsa sessiz başlat
    });

    // --- Video Interaction (33s - 37s) ---
    video.addEventListener('timeupdate', () => {
        // Eğer süre 33 ile 37 arasındaysa sağa kaydır
        if (video.currentTime >= 33 && video.currentTime < 37) {
            container.classList.add('slide-right');
        } else {
            container.classList.remove('slide-right');
        }
    });

    // --- Render Content ---
    const container = document.createElement('div');
    container.className = 'container';

    // Profile Picture
    const profilePic = document.createElement('img');
    profilePic.src = userData.profilePic;
    profilePic.alt = 'Profile Picture';
    profilePic.className = 'profile-pic';
    container.appendChild(profilePic);

    // Name
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = userData.name;
    container.appendChild(nameHeader);

    // Subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = userData.subtitle;
    container.appendChild(subtitle);

    // Card (Mini Profile)
    const card = document.createElement('div');
    card.className = 'card';
    
    const cardPic = document.createElement('img');
    cardPic.src = userData.card.pic;
    cardPic.alt = 'Card Picture';
    cardPic.className = 'card-pic';
    card.appendChild(cardPic);

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';
    
    const cardName = document.createElement('p');
    cardName.className = 'username';
    cardName.textContent = userData.card.name;
    cardInfo.appendChild(cardName);

    const cardStatus = document.createElement('p');
    cardStatus.className = 'status';
    cardStatus.textContent = userData.card.status;
    cardInfo.appendChild(cardStatus);

    card.appendChild(cardInfo);
    container.appendChild(card);

    // Social Links
    const socialLinks = document.createElement('div');
    socialLinks.className = 'social-links';
    
    userData.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.innerHTML = `<i class="${link.icon}"></i>`;
        socialLinks.appendChild(a);
    });
    container.appendChild(socialLinks);

    // Visitor Counter
    const visitorCounter = document.createElement('div');
    visitorCounter.className = 'visitor-counter';
    // Using a placeholder number as there is no backend for real counting in this snippet
    visitorCounter.innerHTML = '<i class="fas fa-eye"></i> Ziyaretçi Sayısı: <span>1923</span>'; 
    container.appendChild(visitorCounter);

    app.appendChild(container);

    // --- Sound Controls ---
    const soundContainer = document.createElement('div');
    soundContainer.id = 'sound-button-container';

    const soundButton = document.createElement('button');
    soundButton.id = 'sound-button';
    const soundIcon = document.createElement('i');
    soundIcon.className = 'fas fa-volume-mute'; // Start with volume mute icon
    soundButton.appendChild(soundIcon);
    
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.id = 'volume-slider';
    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.01;
    volumeSlider.value = 0; // Start with volume 0

    soundContainer.appendChild(soundButton);
    soundContainer.appendChild(volumeSlider);
    document.body.appendChild(soundContainer);
    
    soundButton.addEventListener('click', () => {
        video.muted = !video.muted;
        soundIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        volumeSlider.value = video.muted ? 0 : video.volume;
        // if unmuting from volume 0, set to a default
        if (!video.muted && video.volume === 0) {
            video.volume = 0.5;
            volumeSlider.value = 0.5;
        }
    });
});


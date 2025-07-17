// Load projects from JSON file
async function loadProjects() {
  try {
    console.log('Loading projects...');
    const response = await fetch('assets/data/projects.json?v=' + Date.now());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const projects = await response.json();
    console.log('Projects loaded:', projects);
    
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) {
      throw new Error('Projects container not found!');
    }
    console.log('Projects container found:', projectsContainer);
    
    // Reverse the projects array to display in reverse order
    const reversedProjects = projects.reverse();
    
    reversedProjects.forEach((project, index) => {
      console.log(`Creating card ${index + 1} for project:`, project.title);
      const projectCard = createProjectCard(project);
      projectsContainer.appendChild(projectCard);
    });
    
    console.log('All project cards created successfully');
  } catch (error) {
    console.error('Error loading projects:', error);
    console.error('Error details:', error.message);
  }
}

// Create a project card element
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  console.log('Creating card with image:', project.image);
  
  // Create a link wrapper for the entire card
  const cardLink = document.createElement('a');
  cardLink.href = getProjectPageUrl(project.title);
  cardLink.style.textDecoration = 'none';
  cardLink.style.color = 'inherit';
  cardLink.style.display = 'block';
  
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" />
    <div class="project-info">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-technologies">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-links">
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Live Demo</a>` : ''}
        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">GitHub</a>` : ''}
      </div>
    </div>
  `;
  
  // Move the card content into the link
  cardLink.innerHTML = card.innerHTML;
  card.innerHTML = '';
  card.appendChild(cardLink);
  
  return card;
}

// Function to get the corresponding project page URL
function getProjectPageUrl(projectTitle) {
  const projectPages = {
    'Twitter Sentiment Analysis': 'twittersentiment.html',
    'Weather Visualization': 'weathervisualization.html',
    'Cyberheroes': 'cyberheroes.html'
  }; 
  return projectPages[projectTitle] || '#';
}

// Load projects when the page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only apply smooth scrolling to anchor links (starting with #)
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      // Allow regular page links to work normally
    });
  });
}); 
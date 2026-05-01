import './css/theme.css'
import './css/intro.css'
import './css/style.css'
import { initIntro } from './js/intro.js'
import './js/chat.js'
import { supabase } from './js/supabase.js'

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the cinematic intro sequence
  initIntro();

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Application Form Logic
  const portfolioSize = document.getElementById('business-count');
  const brandsCountContainer = document.getElementById('brands-count-container');
  const brandsCountInput = document.getElementById('brands-count');
  const dynamicBrandsContainer = document.getElementById('dynamic-brands-container');

  // Event Delegation for Toggle Buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle-btn')) {
      const btn = e.target;
      const group = btn.closest('.toggle-group');
      const parent = btn.closest('.form-group');
      const conditionalInput = parent.querySelector('.conditional-input');
      const value = btn.getAttribute('data-value');

      // Update active state
      group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/Hide conditional input
      if (conditionalInput) {
        conditionalInput.style.display = (value === 'yes') ? 'flex' : 'none';
      }
    }
  });

  portfolioSize.addEventListener('change', (e) => {
    if (e.target.value === 'multiple') {
      brandsCountContainer.style.display = 'flex';
      updateBrandFields(brandsCountInput.value || 2);
    } else {
      brandsCountContainer.style.display = 'none';
      dynamicBrandsContainer.innerHTML = '';
    }
  });

  brandsCountInput.addEventListener('input', (e) => {
    updateBrandFields(e.target.value);
  });

  function updateBrandFields(count) {
    dynamicBrandsContainer.innerHTML = '';
    const num = Math.min(Math.max(parseInt(count) || 0, 2), 10);
    
    for (let i = 1; i <= num; i++) {
      const brandBlock = document.createElement('div');
      brandBlock.className = 'form-section brand-block';
      brandBlock.innerHTML = `
        <h3 id="brand-header-${i}">Brand #${i} Details</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Brand Name</label>
            <input type="text" class="brand-name-input" data-index="${i}" placeholder="Brand Name" required>
          </div>
          <div class="form-group">
            <label>Do you have a live website for this brand?</label>
            <div class="toggle-group">
              <button type="button" class="toggle-btn" data-value="yes">Yes</button>
              <button type="button" class="toggle-btn" data-value="no">No, I need one</button>
            </div>
            <input type="url" class="conditional-input" placeholder="https://brand${i}.com" style="display: none;">
          </div>
        </div>

        <div class="form-group full-width">
          <label>Are you running paid ads for this brand?</label>
          <div class="toggle-group">
            <button type="button" class="toggle-btn" data-value="yes">Yes</button>
            <button type="button" class="toggle-btn" data-value="no">No, not yet</button>
          </div>
          <div class="checkbox-group conditional-input" style="display: none;">
            <label class="checkbox-item"><input type="checkbox" name="ads-${i}" value="instagram"><span>Instagram</span></label>
            <label class="checkbox-item"><input type="checkbox" name="ads-${i}" value="tiktok"><span>TikTok</span></label>
            <label class="checkbox-item"><input type="checkbox" name="ads-${i}" value="youtube"><span>YouTube</span></label>
            <label class="checkbox-item"><input type="checkbox" name="ads-${i}" value="google"><span>Google</span></label>
          </div>
        </div>

        <div class="form-group full-width">
          <label>Are your socials already set up for this brand?</label>
          <div class="toggle-group">
            <button type="button" class="toggle-btn" data-value="yes">Yes</button>
            <button type="button" class="toggle-btn" data-value="no">No, I need them built</button>
          </div>
          <div class="social-links-grid conditional-input" style="display: none;">
            <div class="social-input"><span class="social-icon">IG</span><input type="url" placeholder="Instagram URL"></div>
            <div class="social-input"><span class="social-icon">TT</span><input type="url" placeholder="TikTok URL"></div>
          </div>
        </div>
      `;
      dynamicBrandsContainer.appendChild(brandBlock);

      // Real-time title update logic
      const nameInput = brandBlock.querySelector('.brand-name-input');
      const header = brandBlock.querySelector(`#brand-header-${i}`);
      nameInput.addEventListener('input', (e) => {
        header.innerText = e.target.value.trim() ? `${e.target.value.trim()} Details` : `Brand #${i} Details`;
      });
    }
  }

  // Handle Application Form Submission
  const appForm = document.querySelector('.application-form');
  appForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = appForm.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Transmitting...';
    submitBtn.disabled = true;

    // Collect Data
    const formData = {
      full_name: document.getElementById('name').value,
      position: document.getElementById('position').value,
      business_count: document.getElementById('business-count').value,
      email: document.getElementById('email').value,
      website_url: document.querySelector('.toggle-group[data-group="website"] .active')?.getAttribute('data-value') === 'yes' ? document.getElementById('website').value : 'Needs Website',
      business_stage: document.getElementById('stage').value,
      running_ads: document.querySelector('.toggle-group[data-group="ads"] .active')?.getAttribute('data-value') === 'yes',
      ad_platforms: Array.from(document.querySelectorAll('input[name="ads"]:checked')).map(cb => cb.value),
      has_socials: document.querySelector('.toggle-group[data-group="socials"] .active')?.getAttribute('data-value') === 'yes',
      marketing_challenge: document.getElementById('challenge').value,
      multi_brand_data: []
    };

    // Collect Multi-brand data if applicable
    if (formData.business_count === 'multiple') {
      const brandBlocks = document.querySelectorAll('.brand-block');
      brandBlocks.forEach(block => {
        formData.multi_brand_data.push({
          name: block.querySelector('.brand-name-input').value,
          website: block.querySelector('.toggle-group .active')?.getAttribute('data-value') === 'yes' ? block.querySelector('input[type="url"]').value : 'Needs Website',
          ads: block.querySelector('.toggle-group[data-group="ads"] .active')?.getAttribute('data-value') === 'yes'
        });
      });
    }

    const { error } = await supabase.from('leads').insert([formData]);

    if (error) {
      alert('Transmission Error. Please try again.');
      submitBtn.innerText = 'Submit Application';
      submitBtn.disabled = false;
    } else {
      // Trigger Email Notification via Vercel Function
      fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      appForm.innerHTML = '<div class="success-message"><h2>Transmission Successful.</h2><p>Our team is auditing your business now. We will be in touch within 24 hours.</p></div>';
    }
  });

  // Handle Chat Form Submission (Global Listener since it's dynamic)
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'chat-form') {
      e.preventDefault();
      const chatForm = e.target;
      const submitBtn = chatForm.querySelector('button');
      submitBtn.innerText = 'Sending...';

      const chatData = {
        full_name: document.getElementById('chat-name').value,
        email: document.getElementById('chat-email').value,
        marketing_challenge: `CHAT MESSAGE: ${document.getElementById('chat-message').value}`
      };

      const { error } = await supabase.from('leads').insert([chatData]);

      if (error) {
        alert('Error sending message.');
        submitBtn.innerText = 'Send Message';
      } else {
        chatForm.innerHTML = '<p class="success-message">Message sent! We\'ll email you soon.</p>';
      }
    }
  });
});

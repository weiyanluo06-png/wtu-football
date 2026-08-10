// ============================
// 武汉纺织大学材料学院足球队 - 交互脚本
// ============================

document.addEventListener('DOMContentLoaded', function () {

  // ============================
  // 导航栏滚动效果
  // ============================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;

    // 导航栏阴影
    if (scrolled > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 回到顶部按钮
    if (scrolled > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // 高亮当前导航项
    updateActiveNav();
  });

  // ============================
  // 移动端菜单
  // ============================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // 点击导航链接后关闭移动菜单
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ============================
  // 导航高亮（滚动到对应区域）
  // ============================
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    var current = '';

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ============================
  // 回到顶部
  // ============================
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================
  // 数字计数动画
  // ============================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    var heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    var rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      statsAnimated = true;
      statNumbers.forEach(function (num) {
        var target = parseInt(num.getAttribute('data-target'));
        var current = 0;
        var increment = target / 40;
        var interval = setInterval(function () {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          num.textContent = Math.floor(current);
        }, 25);
      });
    }
  }

  window.addEventListener('scroll', animateStats);
  animateStats();

  // ============================
  // 滚动揭示动画
  // ============================
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // 添加延迟使元素逐个出现
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ============================
  // 赛季标签切换
  // ============================
  var seasonTabs = document.querySelectorAll('.season-tab');
  var seasonContents = document.querySelectorAll('.season-content');

  seasonTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var season = tab.getAttribute('data-season');

      seasonTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      seasonContents.forEach(function (content) {
        content.classList.remove('active');
        if (content.getAttribute('data-season') === season) {
          content.classList.add('active');
        }
      });

      // 重置位置筛选为"全部"
      var filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      filterBtns[0].classList.add('active');

      // 显示当前赛季所有球员
      var activeSeason = document.querySelector('.season-content.active');
      if (activeSeason) {
        var cards = activeSeason.querySelectorAll('.player-card');
        cards.forEach(function (card) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      }
    });
  });

  // ============================
  // 球员位置筛选（仅作用于当前赛季）
  // ============================
  var filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var position = btn.getAttribute('data-position');
      var activeSeason = document.querySelector('.season-content.active');

      if (!activeSeason) return;

      var playerCards = activeSeason.querySelectorAll('.player-card');

      // 更新按钮状态
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // 筛选球员
      playerCards.forEach(function (card) {
        var cardPos = card.getAttribute('data-position');
        if (position === 'all' || cardPos === position) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(function () {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ============================
  // 赛程/战绩标签切换
  // ============================
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabContents = document.querySelectorAll('.schedule-content');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      tabContents.forEach(function (content) {
        content.classList.remove('active');
        if (content.getAttribute('id') === tabId) {
          content.classList.add('active');
          // 重新触发动画
          var rows = content.querySelectorAll('.reveal');
          rows.forEach(function (row, i) {
            row.classList.remove('visible');
            setTimeout(function () {
              row.classList.add('visible');
            }, i * 100);
          });
        }
      });
    });
  });

  // ============================
  // 赛程战绩 - 赛季标签页切换
  // ============================
  var scheduleSeasonTabs = document.querySelectorAll('.schedule-season-tab');
  var scheduleSeasonContents = document.querySelectorAll('.schedule-season-content');

  scheduleSeasonTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var seasonId = tab.getAttribute('data-schedule-season');

      scheduleSeasonTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      scheduleSeasonContents.forEach(function (content) {
        content.classList.remove('active');
        if (content.getAttribute('data-schedule-season') === seasonId) {
          content.classList.add('active');
          // 触发该赛季第一个赛事的动画
          var firstActiveContent = content.querySelector('.tournament-content.active');
          if (firstActiveContent) {
            var rows = firstActiveContent.querySelectorAll('.reveal');
            rows.forEach(function (row, i) {
              row.classList.remove('visible');
              setTimeout(function () {
                row.classList.add('visible');
              }, i * 80);
            });
          }
        }
      });
    });
  });

  // ============================
  // 赛程战绩 - 赛事标签页切换（仅在当前赛季内）
  // ============================
  var tournamentTabs = document.querySelectorAll('.tournament-tab');

  tournamentTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tournamentId = tab.getAttribute('data-tournament');
      // 找到当前tab所在的赛季容器
      var seasonContent = tab.closest('.schedule-season-content');
      if (!seasonContent) return;

      // 只在当前赛季内切换赛事标签
      var seasonTabs = seasonContent.querySelectorAll('.tournament-tab');
      var seasonContents = seasonContent.querySelectorAll('.tournament-content');

      seasonTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      seasonContents.forEach(function (content) {
        content.classList.remove('active');
        if (content.getAttribute('data-tournament') === tournamentId) {
          content.classList.add('active');
          // 重新触发动画
          var rows = content.querySelectorAll('.reveal');
          rows.forEach(function (row, i) {
            row.classList.remove('visible');
            setTimeout(function () {
              row.classList.add('visible');
            }, i * 80);
          });
        }
      });
    });
  });

  // ============================
  // 图库灯箱
  // ============================
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxCounter = document.getElementById('lightboxCounter');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');

  // 渐变色映射
  var gradientMap = {
    'gp-1': 'linear-gradient(135deg, #1B4F9C 0%, #0F3568 100%)',
    'gp-2': 'linear-gradient(135deg, #3A7BD5 0%, #FF6B35 100%)',
    'gp-3': 'linear-gradient(135deg, #FF6B35 0%, #FFD700 100%)',
    'gp-4': 'linear-gradient(135deg, #0F3568 0%, #3A7BD5 100%)',
    'gp-5': 'linear-gradient(135deg, #2ECC71 0%, #3A7BD5 100%)',
    'gp-6': 'linear-gradient(135deg, #1B4F9C 0%, #2ECC71 100%)'
  };

  // 图组数据
  var galleryGroups = {
    'training': [
      { image: 'images/gallery/training/training-01.jpg', caption: '夏季集训合影' }
    ],
    'awards': [
      { image: 'images/honors/honor-2026-cup8.jpg', caption: '2026纺大杯八人制冠军颁奖' },
      { image: 'images/honors/honor-2025-cup11-3rd.jpg', caption: '2025纺大杯十一人制季军颁奖' },
      { image: 'images/honors/honor-2025-cup8-3rd.jpg', caption: '2025纺大杯八人制生材联队季军颁奖' },
      { image: 'images/honors/honor-2024-newcup-2nd.jpg', caption: '2024新生杯八人制生材联队亚军颁奖' },
      { image: 'images/honors/honor-2022-newcup-3rd.jpg', caption: '2022新生杯十一人制季军合影' }
    ],
    'team-family': [
      { image: 'images/gallery/team/team-01.jpg', caption: '球队全家福 1' },
      { image: 'images/gallery/team/team-02.jpg', caption: '球队全家福 2' },
      { image: 'images/gallery/team/team-03.jpg', caption: '球队全家福 3' },
      { image: 'images/gallery/team/team-04.jpg', caption: '球队全家福 4' },
      { image: 'images/gallery/team/team-05.jpg', caption: '球队全家福 5' },
      { image: 'images/gallery/team/team-06.jpg', caption: '球队全家福 6' }
    ],
    'match-moments': [
      { image: 'images/gallery/moments/moment-01.jpg', caption: '比赛瞬间 1' },
      { image: 'images/gallery/moments/moment-02.jpg', caption: '比赛瞬间 2' },
      { image: 'images/gallery/moments/moment-03.jpg', caption: '比赛瞬间 3' },
      { image: 'images/gallery/moments/moment-04.jpg', caption: '比赛瞬间 4' },
      { image: 'images/gallery/moments/moment-05.jpg', caption: '比赛瞬间 5' },
      { image: 'images/gallery/moments/moment-06.jpg', caption: '比赛瞬间 6' },
      { image: 'images/gallery/moments/moment-07.jpg', caption: '比赛瞬间 7' },
      { image: 'images/gallery/moments/moment-08.jpg', caption: '比赛瞬间 8' },
      { image: 'images/gallery/moments/moment-09.jpg', caption: '比赛瞬间 9' },
      { image: 'images/gallery/moments/moment-10.jpg', caption: '比赛瞬间 10' },
      { image: 'images/gallery/moments/moment-11.jpg', caption: '比赛瞬间 11' },
      { image: 'images/gallery/moments/moment-12.jpg', caption: '比赛瞬间 12' },
      { image: 'images/gallery/moments/moment-13.jpg', caption: '比赛瞬间 13' },
      { image: 'images/gallery/moments/moment-14.jpg', caption: '比赛瞬间 14' },
      { image: 'images/gallery/moments/moment-15.jpg', caption: '比赛瞬间 15' }
    ]
  };

  // 当前浏览状态
  var currentGroup = null;
  var currentIndex = 0;

  function showGroupImage(group, index) {
    var items = galleryGroups[group];
    if (!items || index < 0 || index >= items.length) return;

    currentIndex = index;
    var item = items[index];

    // 清除上一次的状态
    lightboxImage.classList.remove('has-photo');
    lightboxImage.style.background = '';
    lightboxImage.textContent = '';

    if (item.image) {
      lightboxImage.classList.add('has-photo');
      lightboxImage.style.backgroundImage = 'url("' + item.image + '")';
      lightboxImage.style.backgroundSize = 'contain';
      lightboxImage.style.backgroundPosition = 'center';
      lightboxImage.style.backgroundRepeat = 'no-repeat';
    }

    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = (index + 1) + ' / ' + items.length;

    // 显示/隐藏导航按钮
    if (items.length <= 1) {
      lightboxPrev.classList.add('hidden');
      lightboxNext.classList.add('hidden');
    } else {
      lightboxPrev.classList.remove('hidden');
      lightboxNext.classList.remove('hidden');
    }
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var caption = item.getAttribute('data-caption');
      var imagePath = item.getAttribute('data-image');
      var groupName = item.getAttribute('data-gallery-group');

      // 清除上一次的图片状态
      lightboxImage.classList.remove('has-photo');
      lightboxImage.style.background = '';
      lightboxImage.textContent = '';

      if (groupName && galleryGroups[groupName]) {
        // 图组模式 - 显示第一张，支持前后切换
        currentGroup = groupName;
        showGroupImage(groupName, 0);
      } else if (imagePath) {
        // 单张图片
        currentGroup = null;
        lightboxImage.classList.add('has-photo');
        lightboxImage.style.backgroundImage = 'url("' + imagePath + '")';
        lightboxImage.style.backgroundSize = 'contain';
        lightboxImage.style.backgroundPosition = 'center';
        lightboxImage.style.backgroundRepeat = 'no-repeat';
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = '';
        lightboxPrev.classList.add('hidden');
        lightboxNext.classList.add('hidden');
      } else {
        // Emoji 占位图库项
        currentGroup = null;
        var placeholder = item.querySelector('.gallery-placeholder');
        var emoji = item.querySelector('.gallery-emoji').textContent;
        var className = placeholder.classList[1]; // gp-1, gp-2, etc.

        lightboxImage.style.background = gradientMap[className] || gradientMap['gp-1'];
        lightboxImage.textContent = emoji;
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = '';
        lightboxPrev.classList.add('hidden');
        lightboxNext.classList.add('hidden');
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentGroup = null;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // 前后切换
  lightboxPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!currentGroup) return;
    var items = galleryGroups[currentGroup];
    showGroupImage(currentGroup, (currentIndex - 1 + items.length) % items.length);
  });

  lightboxNext.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!currentGroup) return;
    var items = galleryGroups[currentGroup];
    showGroupImage(currentGroup, (currentIndex + 1) % items.length);
  });

  // ESC 关闭灯箱
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
    // 左右键切换
    if (lightbox.classList.contains('active') && currentGroup) {
      if (e.key === 'ArrowLeft') {
        var items = galleryGroups[currentGroup];
        showGroupImage(currentGroup, (currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        var items2 = galleryGroups[currentGroup];
        showGroupImage(currentGroup, (currentIndex + 1) % items2.length);
      }
    }
  });

  // ============================
  // 平滑滚动（兼容旧浏览器）
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 70; // 导航栏高度
        var targetPos = target.offsetTop - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});

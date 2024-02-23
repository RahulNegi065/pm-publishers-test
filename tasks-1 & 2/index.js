const menuItems = [
    {
        component: "NavTitle",
        name: "INSTITUTE"
    },
    {
        component: "NavItem",
        name: "Home",
        to: "home",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 8
    },
    {
        component: "NavItem",
        name: "My Institutions",
        to: "my-institutions",
        permissionId: 3
    },
    {
        component: "NavItem",
        name: "My Classes",
        to: "my-classes",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 6
    },
    {
        component: "NavGroup",
        name: "Analytics",
        to: "analytics",
        permissionId: 2,
        items: [
            {
                component: "NavItem",
                name: "Institute Overview",
                to: "analytics/data-overview",
                permissionId: 2
            }
        ]
    },
    {
        component: "NavItem",
        name: "Knowledge Meter",
        to: "knowledge-meter",
        badge: {
            color: "info",
            text: "NEW"
        },
        permissionId: 2
    },
    {
        component: "NavGroup",
        name: "Micro Learning",
        to: "micro-learning",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Management",
                to: "micro-learning/management",
                permissionId: 8
            },
            {
                component: "NavItem",
                name: "Student View",
                to: "micro-learning/studentview",
                permissionId: 4
            }
        ]
    },
    {
        component: "NavGroup",
        name: "My Tests",
        to: "tests",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Scheduled Tests",
                to: "tests/scheduled-tests",
                permissionId: 6
            },
            {
                component: "NavItem",
                name: "Tests Repository",
                to: "tests/test-repository",
                permissionId: 6
            },
            {
                component: "NavItem",
                name: "Reports",
                to: "tests/reports",
                permissionId: 6
            }
        ]
    },
    {
        component: "NavTitle",
        name: "RESOURCE LINKS"
    },
    {
        component: "NavItem",
        name: "Assets",
        to: "assets",
        permissionId: 5
    },
    {
        component: "NavItem",
        name: "Teacher Resources",
        to: "teacher-resources",
        permissionId: 2
    },
    {
        component: "NavGroup",
        name: "Videos",
        to: "videos",
        permissionId: 2,
        items: [
            {
                component: "NavItem",
                name: "Concept Videos",
                to: "videos/concept-videos",
                permissionId: 3
            }
        ]
    },
    {
        component: "NavGroup",
        name: "Question Bank",
        to: "questionbank",
        permissionId: 4,
        items: [
            {
                component: "NavItem",
                name: "Publisher Questions",
                to: "questionbank/pub-questions",
                permissionId: 5
            },
            {
                component: "NavItem",
                name: "My Questions",
                to: "questionbank/my-questions",
                permissionId: 8
            },
            {
                component: "NavItem",
                name: "My Institution Questions",
                to: "questionbank/institute-questions",
                permissionId: 4
            }
        ]
    },
    {
        component: "NavItem",
        name: "Chapters & Topics",
        to: "chapter-topics",
        permissionId: 3
    },
    {
        component: "NavGroup",
        name: "Teacher Training",
        to: "teacher-training",
        permissionId: 8,
        items: [
            {
                component: "NavItem",
                name: "Live Classes",
                to: "teacher-training/live-classes",
                permissionId: 4
            },
            {
                component: "NavItem",
                name: "Training Materials",
                to: "teacher-training/training-material",
                permissionId: 5
            }
        ]
    },
    {
        component: "NavItem",
        name: "Attendance",
        to: "attendance",
        permissionId: 5
    },
    {
        component: "NavTitle",
        name: "ADMIN"
    },
    {
        component: "NavItem",
        name: "Administration",
        to: "administration",
        permissionId: 5
    }
]

// <----- TASK 1 starts ------>
const result = menuItems.filter(menu => {
    if(menu.permissionId && [3,4].includes(menu.permissionId)) {
        return menu;
    } else if(menu.items) {
        const index = menu.items.findIndex(item => [5,8].includes(item.permissionId))
        if(index>=0) return menu;
    }
})
// <----- TASK 1 finished------>


// <----- TASK 2 starts ------>
async function sendData(data) {
  try {
    const res = await fetch('https://pmponline.co.in/sdetest/requests.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const resData = await res.json();
    console.log(resData);
    return res;
  } catch(error) {
    // console.log(error);
    return;
  }
}

async function updateResult(data) {
    while(data.length) {
        const item = data.shift();
        await sendData(item);
    }
}

updateResult(result);
// <----- TASK 2 finished ------>
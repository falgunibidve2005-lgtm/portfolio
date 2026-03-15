import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } 
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
}

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

const projects = [
    {
        id: 'farmer-income',
        title: "Farmer's Income & Expenditure Management",
        subtitle: 'Financial Tracking System for Farmers',
        color: '#10b981', // Emerald
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        problem: 'Farmers lack accessible tools to track farming and household finances, leading to poor visibility into cash flow.',
        architecture: {
            description: 'Full-stack web application with PHP and MySQL',
            flow: 'HTML/CSS/JS → PHP → MySQL → Reports',
            layers: [
                { name: 'UI/UX', detail: 'Responsive dashboard for transaction entry and summaries.' },
                { name: 'Backend', detail: 'PHP logic for data processing and categorization.' },
                { name: 'Database', detail: 'SQL schema optimized for financial reporting.' }
            ]
        },
        decisions: [
            'Used PHP for simple, reliable server-side processing.',
            'Normalized SQL schema to separate farming and household categories.',
            'Implemented automated report generation for financial summaries.'
        ],
        tradeoffs: 'Chose a classic PHP stack over heavy frameworks to ensure simplicity and stable deployment.',
        features: [
            'Farming & household income tracking',
            'Automated financial reports',
            'Transaction categorization',
            'Optimized SQL data retrieval'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
    },
    {
        id: 'household-budget',
        title: 'Household Budget Management System',
        subtitle: 'Daily Expense Tracker with Budget Monitoring',
        color: '#60a5fa', // Blue
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        problem: 'Manual expense tracking is error-prone and lacks insights, making budget planning difficult for families.',
        architecture: {
            description: 'PHP-powered web app with category-based analytics',
            flow: 'HTML/JS → PHP Controller → MySQL → Analytics',
            layers: [
                { name: 'UI', detail: 'JavaScript-enhanced forms for budget monitoring.' },
                { name: 'Logic', detail: 'PHP logic for expense validation and categorization.' },
                { name: 'Data', detail: 'SQL queries for spending pattern analysis.' }
            ]
        },
        decisions: [
            'Implemented category-based tracking for meaningful analysis.',
            'Used SQL aggregation for efficient pattern computation.',
            'Designed budget alerts for approaching spending limits.'
        ],
        tradeoffs: 'Focused on server-side stability and simplicity over framework complexity.',
        features: [
            'Daily household expense tracking',
            'Budget monitoring & alerts',
            'Expense categorization',
            'Pattern analysis dashboard'
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'SQL']
    }
]

function Projects() {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeProject = projects[activeIndex]

    return (
        <section className="projects section" id="projects">
            <div className="container">
                <motion.div
                    className="section-header projects-dashboard-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUpVariants}
                >
                    <div className="header-text-group">
                        <h2 className="section-title">Projects</h2>
                        <p className="section-subtitle">
                            Select a project below to explore the details and technical breakdown
                        </p>
                    </div>
                </motion.div>

                <div className="projects-dashboard">
                    {/* LEFT PANEL: Project List */}
                    <motion.aside 
                        className="projects-sidebar"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeUpVariants}
                    >
                        <div className="projects-menu">
                            {projects.map((project, index) => {
                                const isActive = index === activeIndex
                                return (
                                    <button 
                                        key={project.id} 
                                        className={`project-menu-item ${isActive ? 'active' : ''}`}
                                        onClick={() => setActiveIndex(index)}
                                        style={{ '--project-color': project.color }}
                                    >
                                        <div className="menu-item-icon" data-project={project.id}>
                                            {project.icon}
                                        </div>
                                        <div className="menu-item-text">
                                            <span className="menu-item-id">PRJ.0{index + 1}</span>
                                            <span className="menu-item-title">{project.title}</span>
                                        </div>
                                        {isActive && (
                                            <motion.div 
                                                className="menu-item-indicator" 
                                                layoutId="activeIndicator" 
                                                style={{ 
                                                    background: project.color,
                                                    boxShadow: `0 0 15px ${project.color}aa`
                                                }}
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </motion.aside>

                    {/* RIGHT PANEL: Project Details */}
                    <div className="projects-content-area">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                className="project-detail-view"
                                data-project={activeProject.id}
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                style={{ '--active-color': activeProject.color }}
                            >
                                <motion.div variants={itemVariants} className="detail-header">
                                    <h3 className="detail-title">{activeProject.title}</h3>
                                    <p className="detail-subtitle">{activeProject.subtitle}</p>
                                    <div className="detail-tech-stack">
                                        {activeProject.tech.map((tech, i) => (
                                            <span 
                                                className="tech-badge" 
                                                key={i}
                                                style={{ 
                                                    borderColor: `${activeProject.color}33`,
                                                    background: `${activeProject.color}11`,
                                                    color: activeProject.color 
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>


                                <div className="detail-grid">
                                    {/* Left Column in Detail Pane */}
                                    <div className="detail-col-main">
                                        <motion.div variants={itemVariants} className="detail-section">
                                            <h4 className="detail-section-title">The Problem</h4>
                                            <p className="detail-text">{activeProject.problem}</p>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="detail-section">
                                            <h4 className="detail-section-title">Architecture Flow</h4>
                                            <div className="architecture-flow-box">
                                                <code>{activeProject.architecture.flow}</code>
                                            </div>
                                            <div className="architecture-layers-list">
                                                {activeProject.architecture.layers.map((layer, i) => (
                                                    <div className="layer-row" key={i}>
                                                        <strong>{layer.name}</strong>
                                                        <span>{layer.detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="detail-section">
                                            <h4 className="detail-section-title">Key Decisions</h4>
                                            <ul className="detail-list">
                                                {activeProject.decisions.map((decision, i) => (
                                                    <li key={i}>{decision}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>

                                    {/* Right Column in Detail Pane */}
                                    <div className="detail-col-side">
                                        <motion.div variants={itemVariants} className="detail-section detail-highlight">
                                            <h4 className="detail-section-title text-warn">Trade-offs</h4>
                                            <p className="detail-text">{activeProject.tradeoffs}</p>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="detail-section">
                                            <h4 className="detail-section-title">Core Features</h4>
                                            <ul className="detail-list feature-list">
                                                {activeProject.features.map((feature, i) => (
                                                    <li key={i}>{feature}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects

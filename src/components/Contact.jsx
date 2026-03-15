import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const contactLinks = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        title: 'Email',
        value: 'falgunibidve2005@gmail.com',
        href: 'mailto:falgunibidve2005@gmail.com'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
        ),
        title: 'GitHub',
        value: 'github.com/FalguniBidave',
        href: 'https://github.com/FalguniBidave'
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
        title: 'LinkedIn',
        value: 'linkedin.com/in/falguni-bidave',
        href: 'https://www.linkedin.com/in/falguni-bidave'
    }
]

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Create mailto link with form data
        const subject = `Portfolio Contact from ${formData.name}`
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
        window.location.href = `mailto:falgunibidve2005@gmail.com?subject=${subject}&body=${body}`
    }

    return (
        <>
            <section className="contact section" id="contact">
                <div className="container">
                    <div className="contact-content">
                        <motion.div 
                            className="contact-info"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUpVariants}
                        >
                            <h2>Let's Connect</h2>
                            <p>
                                I'm currently open to internship and entry-level opportunities in web development.
                                If you'd like to discuss a project, collaborate, or just say hello — feel free to reach out!
                            </p>

                            <motion.div className="contact-links" variants={staggerVariants}>
                                {contactLinks.map((link, index) => (
                                    <motion.a
                                        href={link.href}
                                        className="contact-link"
                                        key={index}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        variants={fadeUpVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                    >
                                        <div className="contact-link-icon">{link.icon}</div>
                                        <div className="contact-link-content">
                                            <h4>{link.title}</h4>
                                            <p>{link.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>

                        <motion.div 
                            className="contact-form-wrapper"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeUpVariants}
                        >
                            <h3 className="contact-form-title">Send a Message</h3>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            placeholder="Your Name..."
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="Your Email..."
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <motion.button 
                                    type="submit" 
                                    className="btn btn-primary form-submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <p className="footer-text">
                            © 2025 Falguni Bidave. Built with passion and curiosity.
                        </p>
                        <div className="footer-links">
                            <a href="#hero" className="footer-link">Back to Top</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Contact

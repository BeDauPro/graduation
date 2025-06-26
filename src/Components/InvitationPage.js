import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, User, Star } from 'lucide-react';
import FloatingParticles from './FloatingParticles';

const InvitationPage = ({ onNavigate }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height
                });
            }
        };

        // Chỉ áp dụng hiệu ứng chuột trên desktop
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="invitation-page"
            style={{
                '--mouse-x': mousePosition.x,
                '--mouse-y': mousePosition.y
            }}
        >
            <FloatingParticles />

            {/* Animated background */}
            <div className="invitation-background" />

            <div className="invitation-container">
                {/* Header */}
                <div className="invitation-header">
                    <button
                        onClick={onNavigate}
                        className="back-button"
                    >
                        ← Quay lại
                    </button>

                    <h1 className="invitation-title">
                        Lễ Tốt Nghiệp của Đức
                    </h1>
                    <div className="title-line" />
                </div>

                <div className="invitation-content">
                    {/* Left side - 3D Avatar */}
                    <div className="avatar-section">
                        <div className="avatar-container">
                            <div className="avatar-frame">
                                {/* Placeholder cho ảnh của bạn */}
                                <div className="avatar-placeholder">
                                    <img
                                        src={require('../assets/images/avatar.jpg')}
                                        alt="Đức"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '1.5rem'
                                        }}
                                    />
                                </div>

                                {/* 3D frame effects */}
                                <div className="frame-border-1" />
                                <div className="frame-border-2" />
                            </div>

                            {/* Floating star decoration */}
                            <div className="avatar-decoration">
                                <div className="decoration-star">
                                    <Star className="decoration-icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Event details */}
                    <div className="details-section">
                        <div className="details-card">
                            <h3 className="details-title">
                                <Calendar className="details-icon" />
                                Chi Tiết Sự Kiện
                            </h3>

                            <div className="details-list">
                                <div className="detail-item">
                                    <Clock className="detail-icon clock-icon" />
                                    <div className="detail-content">
                                        <h4>Thời Gian</h4>
                                        <p>7:00 Sáng - 05/07/2025</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <MapPin className="detail-icon location-icon" />
                                    <div className="detail-content">
                                        <h4>Địa Điểm</h4>
                                        <p>Hội trường số 1</p>
                                        <p>Điện Biên Phủ</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <User className="detail-icon user-icon" />
                                    <div className="detail-content">
                                        <h4>Người Tốt Nghiệp</h4>
                                        <p>Đức</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Message card */}
                        <div className="message-card">
                            <p className="message-text">
                                "Hành trình học tập đã kết thúc,
                                <br />
                                <span className="message-highlight">tương lai rộng mở đang chờ đợi!"</span>
                            </p>
                        </div>

                        {/* Action button */}
                        <div className="action-section">
                            <button className="confirm-button">
                                Xác Nhận Tham Dự
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvitationPage;
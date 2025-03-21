import React, {ReactNode} from 'react';
import GoBackButton from "@/components/common/GoBackButton";

export type PageHeaderProps = {
    /**
     * Заголовок страницы
     */
    title: string;
    /**
     * Показывать кнопку "Назад"
     * @default false
     */
    showBackButton?: boolean;
    /**
     * Дополнительные элементы, которые будут отображаться в заголовке
     */
    elements?: ReactNode[];
    /**
     * Дополнительный класс для контейнера
     */
    className?: string;
};

/**
 * Универсальный компонент заголовка страницы
 */
const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   showBackButton = false,
                                                   elements = [],
                                                   className = '',
                                               }) => {
    return (
        <div className={`flex flex-wrap gap-5 items-center ${className}`}>
            {showBackButton && <GoBackButton/>}

            <>
                <h3>{title}</h3>
            </>

            {elements.map((element, index) => (
                <React.Fragment key={`header-element-${index}`}>
                    {element}
                </React.Fragment>
            ))}
        </div>
    );
};

export default PageHeader;
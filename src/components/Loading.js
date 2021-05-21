import { useSelector } from 'react-redux';

export const Loading = () => {
  const loadingSelector = useSelector((state) => state.app.loading);

  return (
    <>
      { loadingSelector && <div className="loading">
        <div className={`preloader-wrapper small active`}>
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}
import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import ClientForm from 'src/pages/ClientForm.vue'
import ClientList from 'src/pages/ClientList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin',
    children: [
      {
        path: '/',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'tenant/:tenant/clientes',
        name: 'ClientList',
        component: () => import('../pages/ClientList.vue') 
      },
      {
        path: 'tenant/:tenant/cadastrar-cliente',
        name: 'ClientCreate',
        component: () => import('../pages/ClientForm.vue') 
      },
      {
        path: 'tenant/:tenant/editar-cliente/:id',
        name: 'ClientEdit',
        component: () => import('../pages/ClientForm.vue') 
      },
      {
        path: 'tenant/:tenant/visualizar-cliente/:id',
        name: 'ClientShow',
        component: () => import('../pages/ClientForm.vue') 
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,        
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
